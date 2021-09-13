import React from 'react';
import { func, number } from 'prop-types';

import { isKeyArrowLeft, isKeyArrowRight, isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { locale } from '../../lib/locale/decorators';
import { Nullable } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { emptyHandler } from '../../lib/utils';
import { isIE11 } from '../../lib/client';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { ArrowChevronRightIcon } from '../../internal/icons/16px';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './Paging.styles';
import * as NavigationHelper from './NavigationHelper';
import { getItems } from './PagingHelper';
import { PagingLocale, PagingLocaleHelper } from './locale';

const IGNORE_EVENT_TAGS = ['input', 'textarea'];

interface ItemComponentProps {
  active: boolean;
  children?: React.ReactNode;
  className: string;
  onClick: () => void;
  pageNumber: number | 'forward';
  tabIndex: number;
}

export interface PagingProps extends CommonProps {
  activePage: number;
  /**
   * Компонент обертки по умолчанию
   * @default <span />
   */
  component: React.ComponentType<ItemComponentProps>;
  onPageChange: (pageNumber: number) => void;
  pagesCount: number;
  disabled?: boolean;
  /**
   * Отключает навигационные подсказки.
   * По-умолчанию подсказки появляются, когда доступно управление с клавиатуры
   * (либо элемент в фокусе, либо globalListeners === true)
   */
  withoutNavigationHint?: boolean;
  caption?: string;
  /**
   * Глобальный слушатель **keyDown**, для навигации клавишами без фокуса на компоненте.
   * Если на странице используется несколько элементов
   * **Paging** с useGlobalListener === true, то обработчик keyDown будет вызываться
   * на каждом из них. Такие случаи лучше обрабатывать отдельно.
   */
  useGlobalListener: boolean;
}

export interface PagingState {
  focusedByTab: boolean;
  focusedItem: Nullable<ItemType>;
  keyboardControl: boolean;
}

export type ItemType = number | '.' | 'forward';

@locale('Paging', PagingLocaleHelper)
export class Paging extends React.Component<PagingProps, PagingState> {
  public static __KONTUR_REACT_UI__ = 'Paging';

  public static defaultProps = {
    component: ({ className, onClick, children }: any) => (
      <span className={className} onClick={onClick}>
        {children}
      </span>
    ),
    useGlobalListener: false,
    ['data-tid']: 'Paging__root',
  };

  public static propTypes = {};

  public static isForward(pageNumber: number | 'forward'): boolean /* %checks */ {
    return pageNumber === 'forward';
  }

  public state: PagingState = {
    focusedByTab: false,
    focusedItem: null,
    keyboardControl: this.props.useGlobalListener,
  };

  private theme!: Theme;
  private readonly locale!: PagingLocale;
  private addedGlobalListener = false;
  private container: HTMLSpanElement | null = null;

  public componentDidMount() {
    const { useGlobalListener } = this.props;
    if (useGlobalListener) {
      this.addGlobalListener();
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: PagingProps) {
    if (this.props.useGlobalListener !== nextProps.useGlobalListener) {
      this.setState({
        keyboardControl: nextProps.useGlobalListener,
      });
    }
  }

  public componentDidUpdate(prevProps: PagingProps) {
    if (!prevProps.useGlobalListener && this.props.useGlobalListener) {
      this.addGlobalListener();
    }

    if (prevProps.useGlobalListener && !this.props.useGlobalListener) {
      this.removeGlobalListener();
    }
  }

  public componentWillUnmount() {
    this.removeGlobalListener();
  }

  public render() {
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
    return (
      <CommonWrapper {...this.props}>
        <span
          tabIndex={0}
          data-tid={this.props['data-tid']}
          className={styles.paging(this.theme)}
          onKeyDown={this.props.useGlobalListener ? undefined : this.handleKeyDown}
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
      <span data-tid="Paging__dots" key={key} className={styles.dots(this.theme)}>
        {'...'}
      </span>
    );
  };

  private renderForwardLink = (disabled: boolean, focused: boolean): JSX.Element => {
    const classes = cx({
      [styles.forwardLink(this.theme)]: true,
      [styles.forwardLinkFocused()]: focused,
      [styles.disabled(this.theme)]: disabled,
    });
    const { component: Component, caption } = this.props;
    const { forward } = this.locale;

    return (
      <Component
        key={'forward'}
        data-tid="Paging__forwardLink"
        active={false}
        className={classes}
        onClick={disabled ? emptyHandler : this.goForward}
        tabIndex={-1}
        pageNumber={'forward' as const}
      >
        {caption || forward}
        <span className={styles.forwardIcon(this.theme)}>
          <ArrowChevronRightIcon size={this.theme.pagingForwardIconSize} />
        </span>
      </Component>
    );
  };

  private renderPageLink = (pageNumber: number, active: boolean, focused: boolean): JSX.Element => {
    const classes = cx({
      [styles.pageLink(this.theme)]: true,
      [styles.pageLinkFocused(this.theme)]: focused,
      [styles.active(this.theme)]: active,
    });
    const Component = this.props.component;
    const handleClick = () => this.goToPage(pageNumber);

    return (
      <span
        data-tid="Paging__pageLinkWrapper"
        key={pageNumber}
        className={styles.pageLinkWrapper()}
        onMouseDown={this.handleMouseDownPageLink}
      >
        <Component
          data-tid="Paging__pageLink"
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

    if (keyboardControl && (canGoBackward || canGoForward)) {
      return (
        <span className={styles.pageLinkHint(this.theme)}>
          <span className={canGoBackward ? '' : styles.transparent()}>{'←'}</span>
          <span>{NavigationHelper.getKeyName()}</span>
          <span className={canGoForward ? '' : styles.transparent()}>{'→'}</span>
        </span>
      );
    }

    return <div className={styles.pageLinkHintPlaceHolder(this.theme)} />;
  };

  private handleMouseDown = () => {
    this.setState({ focusedByTab: false, focusedItem: null });
  };

  private handleMouseDownPageLink = () => {
    if (isIE11) {
      // Клик по span внутри контейнера с tabindex="0" переносит фокус именно на этот span.
      // Поэтому горячие клавиши работают пока span существует на странице.
      setTimeout(() => this.container && this.container.focus(), 0);
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
      target instanceof Element &&
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

  private handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ keyboardControl: true });

    // focus event fires before keyDown eventlistener
    // so we should check tabPressed in async way
    requestAnimationFrame(() => {
      if (keyListener.isTabPressed) {
        this.setState({ focusedByTab: true });
      }
    });
  };

  private handleBlur = () => {
    this.setState({
      focusedByTab: false,
      keyboardControl: this.props.useGlobalListener || false,
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
    if (1 <= pageNumber && pageNumber !== this.props.activePage && pageNumber <= this.props.pagesCount) {
      this.props.onPageChange(pageNumber);
    }
  };

  private addGlobalListener = () => {
    if (this.addedGlobalListener) {
      return;
    }

    document.addEventListener('keydown', this.handleKeyDown);
    this.addedGlobalListener = true;
  };

  private removeGlobalListener = () => {
    if (this.addedGlobalListener) {
      document.removeEventListener('keydown', this.handleKeyDown);

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
