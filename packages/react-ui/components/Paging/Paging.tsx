import React from 'react';
import { func, number } from 'prop-types';
import { globalObject } from '@skbkontur/global-object';

import { isInstanceOf } from '../../lib/isInstanceOf';
import { isKeyArrowLeft, isKeyArrowRight, isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { locale } from '../../lib/locale/decorators';
import { Nullable } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { emptyHandler } from '../../lib/utils';
import { isIE11 } from '../../lib/client';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';

import { styles } from './Paging.styles';
import * as NavigationHelper from './NavigationHelper';
import { getItems } from './PagingHelper';
import { PagingLocale, PagingLocaleHelper } from './locale';
import { PagingDefaultComponent } from './PagingDefaultComponent';
import { ForwardIcon } from './ForwardIcon';

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
   * @default <span /> */
  component?: React.ComponentType<ItemComponentProps>;

  /** Задает функцию, которая вызывается при переключении страницы. */
  onPageChange: (pageNumber: number) => void;

  /** Задает общее количество страниц. */
  pagesCount: number;

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

/**
 * Постраничная навигация `Paging` (пейджинг или пагинация) — способ представления большого количества однородной информации, когда контент разбивается на страницы.
 */
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

  public static propTypes = {};
  private setRootNode!: TSetRootNode;

  public static isForward(pageNumber: number | 'forward'): boolean /* %checks */ {
    return pageNumber === 'forward';
  }

  public state: PagingState = {
    focusedByTab: false,
    focusedItem: null,
    keyboardControl: this.getProps().useGlobalListener,
  };

  private theme!: Theme;
  private readonly locale!: PagingLocale;
  private addedGlobalListener = false;
  private container: HTMLSpanElement | null = null;

  public componentDidMount() {
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

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
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
          className={cx({ [styles.paging(this.theme)]: true, [styles.pagingDisabled()]: this.props.disabled })}
          onKeyDown={useGlobalListener ? undefined : this.handleKeyDown}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseDown={this.handleMouseDown}
          ref={this.refContainer}
        >
          {this.getItems().map(this.renderItem)}
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
        className={cx({ [styles.dots(this.theme)]: true, [styles.dotsDisabled(this.theme)]: this.props.disabled })}
      >
        {'...'}
      </span>
    );
  };

  private renderForwardLink = (disabled: boolean, focused: boolean): JSX.Element => {
    const classes = cx(
      styles.pageLink(this.theme),
      styles.forwardLink(this.theme),
      focused && styles.pageLinkFocused(this.theme),
      (disabled || this.props.disabled) && styles.forwardLinkDisabled(this.theme),
    );
    const Component = this.getProps().component;
    const { forward } = this.locale;

    const forwardIcon = <ForwardIcon size={parseInt(this.theme.pagingForwardIconSize)} style={{ marginLeft: 4 }} />;

    return (
      <Component
        key={'forward'}
        data-tid={PagingDataTids.forwardLink}
        active={false}
        className={classes}
        onClick={disabled ? emptyHandler : this.goForward}
        tabIndex={-1}
        pageNumber={'forward' as const}
        {...getVisualStateDataAttributes({ disabled })}
      >
        {this.props.caption || forward}
        {forwardIcon}
      </Component>
    );
  };

  private renderPageLink = (pageNumber: number, active: boolean, focused: boolean): JSX.Element => {
    const disabled = this.props.disabled;
    const classes = cx({
      [styles.pageLink(this.theme)]: true,
      [styles.pageLinkFocused(this.theme)]: focused,
      [styles.pageLinkDisabled(this.theme)]: disabled,
      [styles.pageLinkCurrent(this.theme)]: active,
      [styles.pageLinkCurrentDisabled(this.theme)]: active && disabled,
    });
    const Component = this.getProps().component;
    const handleClick = () => this.goToPage(pageNumber);

    return (
      <span
        data-tid={PagingDataTids.pageLinkWrapper}
        key={pageNumber}
        className={styles.pageLinkWrapper()}
        {...getVisualStateDataAttributes({ active, disabled })}
        onMouseDown={this.handleMouseDownPageLink}
      >
        <Component
          data-tid={PagingDataTids.pageLink}
          active={active}
          className={classes}
          onClick={handleClick}
          tabIndex={-1}
          pageNumber={pageNumber}
        >
          {pageNumber}
        </Component>
        {active && this.renderNavigationHint()}
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
          <span className={canGoBackward ? '' : styles.transparent()}>{'←'}</span>
          <span>{NavigationHelper.getKeyName()}</span>
          <span className={canGoForward ? '' : styles.transparent()}>{'→'}</span>
        </>
      );
    }
    return <div className={styles.pageLinkHint(this.theme)}>{hint}</div>;
  };

  private handleMouseDown = () => {
    this.setState({ focusedByTab: false, focusedItem: null });
  };

  private handleMouseDownPageLink = () => {
    if (isIE11) {
      // Клик по span внутри контейнера с tabindex="0" переносит фокус именно на этот span.
      // Поэтому горячие клавиши работают пока span существует на странице.
      globalObject.setTimeout(() => this.container && this.container.focus(), 0);
    }
  };

  private handleKeyDown = (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
    if (e.shiftKey) {
      return;
    }

    const target = e.target;

    const isArrowLeft = isKeyArrowLeft(e);
    const isArrowRight = isKeyArrowRight(e);

    if (
      isInstanceOf(target, globalObject.Element) &&
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
    globalObject.requestAnimationFrame?.(() => {
      if (keyListener.isTabPressed) {
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
    return getItems(this.props.activePage, this.props.pagesCount).concat('forward');
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

    globalObject.document?.addEventListener('keydown', this.handleKeyDown);
    this.addedGlobalListener = true;
  };

  private removeGlobalListener = () => {
    if (this.addedGlobalListener) {
      globalObject.document?.removeEventListener('keydown', this.handleKeyDown);

      this.addedGlobalListener = false;
    }
  };

  private refContainer = (element: HTMLSpanElement | null) => {
    this.container = element;
  };
}

Paging.propTypes = {
  /**
   * Current active page
   */
  activePage: number.isRequired,

  /**
   * React component that would be used for rendering items
   *
   * Usefull for router integration
   */
  component: func,

  /**
   * Total page count
   */
  pagesCount: number.isRequired,

  /**
   * Calls when page has been changed
   */
  onPageChange: func.isRequired,
};
