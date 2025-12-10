import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';
import warning from 'warning';

import type { GlobalObject } from '../../lib/globalObject.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import { isKeyArrowLeft, isKeyArrowRight, isKeyEnter } from '../../lib/events/keyboard/identifiers.js';
import { locale } from '../../lib/locale/decorators.js';
import type { Nullable } from '../../typings/utility-types.js';
import { KeyListener } from '../../lib/events/keyListener.js';
import { emptyHandler } from '../../lib/utils.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes.js';
import { ResponsiveLayout } from '../ResponsiveLayout/index.js';
import type { SizeProp } from '../../lib/types/props.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './Paging.styles.js';
import * as NavigationHelper from './NavigationHelper.js';
import { getItems } from './PagingHelper.js';
import type { PagingLocale } from './locale/index.js';
import { PagingLocaleHelper } from './locale/index.js';
import { PagingDefaultComponent } from './PagingDefaultComponent.js';
import { ForwardIcon, ForwardIconMobile } from './ForwardIcon.js';
import { DotsIcon } from './DotsIcon.js';

const IGNORE_EVENT_TAGS = ['input', 'textarea'];

export interface ItemComponentProps {
  /** Определяет, является ли страница текущей. */
  active: boolean;

  /** @ignore */
  children?: React.ReactNode;

  /** Задает HTML-атрибут class. */
  className: string;

  /** Задает функцию, которая вызывается при клике на элемент. */
  onClick: () => void;

  /** Задает номер текущей страницы. */
  pageNumber: number | 'forward';

  /** Задает HTML-атрибут `tabindex`. */
  tabIndex: number;
}

export interface PagingProps extends CommonProps {
  activePage: number;

  /** Компонент обертки по умолчанию.
   * @default <span/> */
  component?: React.ComponentType<ItemComponentProps>;

  /** Задает функцию, которая вызывается при переключении страницы. */
  onPageChange: (pageNumber: number) => void;

  /** Задает общее количество страниц. */
  pagesCount: number;

  /** Задает размер контрола.
   * @default 'small'
   */
  size?: SizeProp;

  /** Делает компонент недоступным. */
  disabled?: boolean;

  /** Отключает навигационные подсказки.
   * По-умолчанию подсказки появляются, когда доступно управление с клавиатуры (либо элемент в фокусе, либо globalListeners === true). */
  withoutNavigationHint?: boolean;

  /** Задает подпить у пейджинга. */
  caption?: string;

  /** Глобальный слушатель **keyDown**, для навигации клавишами без фокуса на компоненте.
   * Если на странице используется несколько элементов **Paging** с useGlobalListener === true,
   * то обработчик keyDown будет вызываться на каждом из них. Такие случаи лучше обрабатывать отдельно. */
  useGlobalListener?: boolean;
}

export interface PagingState {
  focusedByTab: boolean;
  focusedItem: Nullable<ItemType>;
  keyboardControl: boolean;
}

export type ItemType = number | '.' | 'forward';

export const PagingDataTids = {
  root: 'Paging__root',
  dots: 'Paging__dots',
  forwardLink: 'Paging__forwardLink',
  pageLinkWrapper: 'Paging__pageLinkWrapper',
  pageLink: 'Paging__pageLink',
} as const;

type DefaultProps = Required<Pick<PagingProps, 'component' | 'useGlobalListener'>>;

interface PagingSizeClassNames {
  root: string;
  dots: string;
  forwardLink: string;
  pageLink: string;
}

/**
 * Постраничная навигация `Paging` (пейджинг или пагинация) — способ представления большого количества однородной информации, когда контент разбивается на страницы.
 */
@withRenderEnvironment
@rootNode
@locale('Paging', PagingLocaleHelper)
export class Paging extends React.PureComponent<PagingProps, PagingState> {
  public static __KONTUR_REACT_UI__ = 'Paging';
  public static displayName = 'Paging';

  public static defaultProps: DefaultProps = {
    component: PagingDefaultComponent,
    useGlobalListener: false,
  };

  private getProps = createPropsGetter(Paging.defaultProps);

  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public static isForward(pageNumber: number | 'forward'): boolean {
    return pageNumber === 'forward';
  }

  public state: PagingState = {
    focusedByTab: false,
    focusedItem: null,
    keyboardControl: this.getProps().useGlobalListener,
  };

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private readonly locale!: PagingLocale;
  private isMobile!: boolean;
  private sizeClassNames!: PagingSizeClassNames;
  private addedGlobalListener = false;
  private container: HTMLSpanElement | null = null;
  private keyListener!: KeyListener;

  public componentDidMount() {
    this.keyListener = new KeyListener(this.globalObject);
    const useGlobalListener = this.getProps().useGlobalListener;
    if (useGlobalListener) {
      this.addGlobalListener();
    }
  }

  public componentDidUpdate(prevProps: PagingProps) {
    const useGlobalListener = this.getProps().useGlobalListener;
    if (!prevProps.useGlobalListener && useGlobalListener) {
      this.addGlobalListener();
    }

    if (prevProps.useGlobalListener && !useGlobalListener) {
      this.removeGlobalListener();
    }

    if (prevProps.useGlobalListener !== useGlobalListener) {
      this.setState({
        keyboardControl: useGlobalListener,
      });
    }
  }

  public componentWillUnmount() {
    this.removeGlobalListener();
  }

  public render() {
    if (this.props.pagesCount < 2) {
      return null;
    }
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <ResponsiveLayout>
              {({ isMobile }) => {
                this.isMobile = isMobile;
                this.sizeClassNames = this.getPagingSizeClassNames();
                return this.renderMain();
              }}
            </ResponsiveLayout>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { useGlobalListener } = this.getProps();
    return (
      <CommonWrapper
        rootNodeRef={this.setRootNode}
        {...this.props}
        {...getVisualStateDataAttributes({ disabled: this.props.disabled })}
      >
        <span
          tabIndex={this.props.disabled ? -1 : 0}
          data-tid={PagingDataTids.root}
          className={this.cx(this.styles.paging(), this.sizeClassNames.root, {
            [this.styles.pagingMobile()]: this.isMobile,
            [this.styles.pagingDisabled()]: this.props.disabled,
          })}
          onKeyDown={useGlobalListener ? undefined : this.handleKeyDown}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseDown={this.handleMouseDown}
          ref={this.refContainer}
        >
          {this.getItems().map((item, index) => this.renderItem(item, index))}
        </span>
      </CommonWrapper>
    );
  }

  private renderItem = (item: ItemType, index: number) => {
    const focused = this.getFocusedItem() === item;
    switch (item) {
      case '.': {
        const key = `dots${index < 5 ? 'Left' : 'Right'}`;
        return this.renderDots(key);
      }
      case 'forward': {
        const disabled = this.isItemDisabled(item);
        return this.renderForwardLink(disabled, focused);
      }
      default: {
        const active = this.props.activePage === item;
        return this.renderPageLink(item, active, focused);
      }
    }
  };

  private renderDots = (key: string) => {
    return (
      <span
        data-tid={PagingDataTids.dots}
        key={key}
        className={this.cx(this.styles.dots(this.theme), this.sizeClassNames.dots, {
          [this.styles.dotsDisabled(this.theme)]: this.props.disabled,
        })}
      >
        {this.getDotsIcon()}
      </span>
    );
  };

  private renderForwardLink = (disabled: boolean, focused: boolean): JSX.Element => {
    const classNames = this.cx(
      this.styles.pageLink(this.theme),
      this.sizeClassNames.pageLink,
      this.styles.forwardLink(this.theme),
      this.sizeClassNames.forwardLink,
      {
        [this.styles.pageLinkFocused(this.theme)]: focused,
        [this.styles.forwardLinkDisabled(this.theme)]: disabled || this.props.disabled,
      },
    );
    const Component = this.getProps().component;
    const { forward } = this.locale;

    const forwardIcon = this.getForwardIcon();

    return (
      <Component
        key={'forward'}
        data-tid={PagingDataTids.forwardLink}
        active={false}
        className={classNames}
        onClick={disabled ? emptyHandler : this.goForward}
        tabIndex={-1}
        pageNumber={'forward' as const}
        {...getVisualStateDataAttributes({ disabled })}
      >
        {!this.isMobile && (this.props.caption || forward)}
        {forwardIcon}
      </Component>
    );
  };

  private renderPageLink = (pageNumber: number, active: boolean, focused: boolean): JSX.Element => {
    const disabled = this.props.disabled;
    const classNames = this.cx(this.styles.pageLink(this.theme), this.sizeClassNames.pageLink, {
      [this.styles.pageLinkFocused(this.theme)]: focused,
      [this.styles.pageLinkDisabled(this.theme)]: disabled,
      [this.styles.pageLinkCurrent(this.theme)]: active,
      [this.styles.pageLinkCurrentDisabled(this.theme)]: active && disabled,
    });
    const Component = this.getProps().component;
    const handleClick = () => this.goToPage(pageNumber);

    return (
      <span
        data-tid={PagingDataTids.pageLinkWrapper}
        key={pageNumber}
        className={this.styles.pageLinkWrapper()}
        {...getVisualStateDataAttributes({ active, disabled })}
      >
        <Component
          data-tid={PagingDataTids.pageLink}
          active={active}
          className={classNames}
          onClick={handleClick}
          tabIndex={-1}
          pageNumber={pageNumber}
        >
          {pageNumber}
        </Component>
        {active && !this.isMobile && this.renderNavigationHint()}
      </span>
    );
  };

  private renderNavigationHint = () => {
    if (this.props.withoutNavigationHint) {
      return null;
    }

    const { keyboardControl } = this.state;
    const canGoBackward = this.canGoBackward();
    const canGoForward = this.canGoForward();

    let hint = null;
    if (keyboardControl && (canGoBackward || canGoForward)) {
      hint = (
        <>
          <span className={canGoBackward ? '' : this.styles.transparent()}>{'←'}</span>
          <span>{NavigationHelper.getKeyName()}</span>
          <span className={canGoForward ? '' : this.styles.transparent()}>{'→'}</span>
        </>
      );
    }
    return <div className={this.styles.pageLinkHint(this.theme)}>{hint}</div>;
  };

  private handleMouseDown = () => {
    this.setState({ focusedByTab: false, focusedItem: null });
  };

  private handleKeyDown = (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
    if (e.shiftKey) {
      return;
    }

    const target = e.target;

    const isArrowLeft = isKeyArrowLeft(e);
    const isArrowRight = isKeyArrowRight(e);

    if (
      isInstanceOf(target, this.globalObject.Element) &&
      (IGNORE_EVENT_TAGS.includes(target.tagName.toLowerCase()) || (target as HTMLElement).isContentEditable)
    ) {
      return;
    }

    if (NavigationHelper.checkKeyPressed(e) && isArrowLeft) {
      this.setState({ focusedItem: null }, this.goBackward);
      return;
    }
    if (NavigationHelper.checkKeyPressed(e) && isArrowRight) {
      this.setState({ focusedItem: null }, this.goForward);
      return;
    }

    if (this.container && this.container === e.target) {
      if (isArrowLeft) {
        this.setState({ focusedByTab: true }, this.moveFocusLeft);
        return;
      }
      if (isArrowRight) {
        this.setState({ focusedByTab: true }, this.moveFocusRight);
        return;
      }
      if (isKeyEnter(e)) {
        this.executeItemAction(this.getFocusedItem());
        return;
      }
    }
  };

  private handleFocus = () => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ keyboardControl: true });

    // focus event fires before keyDown eventlistener
    // so we should check tabPressed in async way
    this.globalObject.requestAnimationFrame?.(() => {
      if (this.keyListener.isTabPressed) {
        this.setState({ focusedByTab: true });
      }
    });
  };

  private handleBlur = () => {
    this.setState({
      focusedByTab: false,
      keyboardControl: this.getProps().useGlobalListener || false,
    });
  };

  private getItems = (): ItemType[] => {
    return getItems(this.props.activePage, this.props.pagesCount, this.isMobile).concat('forward');
  };

  private getFocusedItem = (): Nullable<ItemType> => {
    if (!this.state.focusedByTab) {
      return null;
    }

    const { focusedItem } = this.state;
    if (focusedItem && this.getItems().includes(focusedItem) && this.isItemFocusable(focusedItem)) {
      return focusedItem;
    }

    return this.props.activePage;
  };

  private isItemFocusable = (item: ItemType) => {
    return !this.isItemDisabled(item);
  };

  private isItemDisabled = (item: ItemType) => {
    switch (item) {
      case '.':
        return true;
      case 'forward':
        return !this.canGoForward();
      default:
        return false;
    }
  };

  private executeItemAction = (item: Nullable<ItemType>) => {
    if (item === 'forward') {
      this.goForward();
    }
    if (typeof item === 'number') {
      this.goToPage(item);
    }
  };

  private moveFocusLeft = () => {
    this.moveFocus(-1);
  };

  private moveFocusRight = () => {
    this.moveFocus(1);
  };

  private moveFocus = (step: number) => {
    const focusedItem = this.getFocusedItem();
    const items = this.getItems();
    let index = items.findIndex((x) => x === focusedItem);
    do {
      index = (index + step + items.length) % items.length;
    } while (!this.isItemFocusable(items[index]));
    this.setState({ focusedItem: items[index] });
  };

  private canGoBackward = (): boolean => {
    return this.props.activePage > 1;
  };

  private canGoForward = (): boolean => {
    return this.props.activePage < this.props.pagesCount;
  };

  private goBackward = () => {
    this.goToPage(this.props.activePage - 1);
  };

  private goForward = () => {
    this.goToPage(this.props.activePage + 1);
  };

  private goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber !== this.props.activePage && pageNumber <= this.props.pagesCount) {
      this.props.onPageChange(pageNumber);
    }
  };

  private addGlobalListener = () => {
    if (this.addedGlobalListener) {
      return;
    }

    this.globalObject.document?.addEventListener('keydown', this.handleKeyDown);
    this.addedGlobalListener = true;
  };

  private removeGlobalListener = () => {
    if (this.addedGlobalListener) {
      this.globalObject.document?.removeEventListener('keydown', this.handleKeyDown);

      this.addedGlobalListener = false;
    }
  };

  private refContainer = (element: HTMLSpanElement | null) => {
    this.container = element;
  };

  private getPagingSizeClassNames = (): PagingSizeClassNames => {
    const size = this.getSize();

    const defaultClassNames = {
      root: this.styles.pagingSmall(this.theme),
      dots: this.styles.dotsSmall(this.theme),
      forwardLink: this.styles.forwardLinkSmall(this.theme),
      pageLink: this.styles.pageLinkSmall(this.theme),
    };

    switch (size) {
      case 'small':
        return defaultClassNames;
      case 'medium':
        return {
          root: this.styles.pagingMedium(this.theme),
          dots: this.styles.dotsMedium(this.theme),
          forwardLink: this.isMobile
            ? this.styles.forwardLinkMediumMobile(this.theme)
            : this.styles.forwardLinkMedium(this.theme),
          pageLink: this.styles.pageLinkMedium(this.theme),
        };
      case 'large':
        return {
          root: this.styles.pagingLarge(this.theme),
          dots: this.styles.dotsLarge(this.theme),
          forwardLink: this.isMobile
            ? this.styles.forwardLinkLargeMobile(this.theme)
            : this.styles.forwardLinkLarge(this.theme),
          pageLink: this.styles.pageLinkLarge(this.theme),
        };
      default:
        warning(false, `Invalid size prop: '${this.props.size}'`);
        return defaultClassNames;
    }
  };

  private getDotsIcon = () => {
    const size = this.getSize();
    return <DotsIcon size={size} />;
  };

  private getForwardIcon = () => {
    const size = this.getSize();
    const iconSize = size;
    return this.isMobile ? (
      <ForwardIconMobile size={iconSize} />
    ) : (
      <ForwardIcon size={iconSize} style={{ marginLeft: 4 }} />
    );
  };

  private getSize = () => {
    if (this.props.size) {
      return this.isMobile && this.props.size === 'small' ? 'medium' : this.props.size;
    }

    const defaultSize = 'small';
    return this.isMobile ? 'medium' : defaultSize;
  };
}
