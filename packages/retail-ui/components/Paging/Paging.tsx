import * as React from 'react';
import { number, func } from 'prop-types';
import cn from 'classnames';
import events from 'add-event-listener';
import ArrowChevronRightIcon from '@skbkontur/react-icons/ArrowChevronRight';

import PagingHelper from './PagingHelper';
import NavigationHelper from './NavigationHelper';
import { Nullable } from '../../typings/utility-types';

import styles from './Paging.less';

interface ItemComponentProps {
  active: boolean;
  children?: React.ReactNode;
  className: string;
  onClick: () => void;
  pageNumber: number | 'forward';
  tabIndex: number;
}

export interface PagingProps {
  activePage: number;
  component: React.ComponentType<ItemComponentProps>;
  onPageChange: (pageNumber: number) => void;
  pagesCount: number;
  disabled?: boolean;
  strings: { forward: string };
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
   * **Paging** с withoutNavigationHint === true, то обработчик keyDown будет вызываться
   * на каждом из них. Такие случаи лучше обрабатывать отдельно.
   */
  useGlobalListener: boolean;
}

export interface PagingState {
  focusedByTab: boolean;
  focusedItem: Nullable<ItemType>;
  keybordControl: boolean;
}

export type ItemType = number | '.' | 'forward';

export default class Paging extends React.Component<PagingProps, PagingState> {
  public static defaultProps = {
    component: ({ className, onClick, children }: any) => (
      <span className={className} onClick={onClick} children={children} />
    ),
    strings: { forward: 'Дальше' },
    useGlobalListener: false
  };

  public static propTypes = {};

  public static isForward(
    pageNumber: number | 'forward'
  ): boolean /* %checks */ {
    return pageNumber === 'forward';
  }

  public state: PagingState = {
    focusedByTab: false,
    focusedItem: null,
    keybordControl: this.props.useGlobalListener
  };

  private addedGlobalListener: boolean = false;

  public componentDidMount() {
    listenTabPresses();

    if (this.props.useGlobalListener) {
      this.addGlobalListener();
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
      <span
        tabIndex={0}
        className={styles.paging}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
      >
        {this.getItems().map(this.renderItem)}
      </span>
    );
  }

  private renderItem = (item: ItemType, index: number) => {
    const focused = this.getFocusedItem() === item;
    switch (item) {
      case '.':
        const key = `dots${index < 5 ? 'Left' : 'Right'}`;
        return this.renderDots(key);
      case 'forward':
        const disabled = this.isItemDisabled(item);
        return this.renderForwardLink(disabled, focused);
      default:
        const active = this.props.activePage === item;
        return this.renderPageLink(item, active, focused);
    }
  };

  private renderDots = (key: string) => {
    return (
      <span key={key} className={styles.dots}>
        {'...'}
      </span>
    );
  };

  private renderForwardLink = (
    disabled: boolean,
    focused: boolean
  ): JSX.Element => {
    const classes = cn({
      [styles.forwardLink]: true,
      [styles.focused]: focused,
      [styles.disabled]: disabled
    });
    const { component: Component, strings } = this.props;

    return (
      <Component
        key={'forward'}
        active={false}
        className={classes}
        onClick={disabled ? noop : this.goForward}
        tabIndex={-1}
        pageNumber={'forward' as 'forward'}
      >
        {this.props.caption ? this.props.caption : strings.forward}
        <span className={styles.forwardIcon}>
          <ArrowChevronRightIcon size="18px" />
        </span>
      </Component>
    );
  };

  private renderPageLink = (
    pageNumber: number,
    active: boolean,
    focused: boolean
  ): JSX.Element => {
    const classes = cn({
      [styles.pageLink]: true,
      [styles.focused]: focused,
      [styles.active]: active
    });
    const Component = this.props.component;
    const handleClick = () => this.goToPage(pageNumber);

    return (
      <span key={pageNumber} className={styles.pageLinkWrapper}>
        <Component
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

    const { keybordControl } = this.state;
    const canGoBackward = this.canGoBackward();
    const canGoForward = this.canGoForward();

    if (keybordControl && (canGoBackward || canGoForward)) {
      return (
        <span className={styles.pageLinkHint}>
          <span className={canGoBackward ? '' : styles.transparent}>{'←'}</span>
          <span>{NavigationHelper.getKeyName()}</span>
          <span className={canGoForward ? '' : styles.transparent}>{'→'}</span>
        </span>
      );
    }

    return <div className={styles.pageLinkHintPlaceHolder} />;
  };

  private handleMouseDown = () => {
    this.setState({ focusedByTab: false, focusedItem: null });
  };

  private handleKeyDown = (
    event: KeyboardEvent | React.KeyboardEvent<HTMLElement>
  ) => {
    if (NavigationHelper.checkKeyPressed(event) && event.key === 'ArrowLeft') {
      event.preventDefault();
      this.setState({ focusedItem: null }, this.goBackward);
      return;
    }
    if (NavigationHelper.checkKeyPressed(event) && event.key === 'ArrowRight') {
      event.preventDefault();
      this.setState({ focusedItem: null }, this.goForward);
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.setState({ focusedByTab: true }, this.moveFocusLeft);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.setState({ focusedByTab: true }, this.moveFocusRight);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      this.executeItemAction(this.getFocusedItem());
      return;
    }
  };

  private handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ keybordControl: true });

    // focus event fires before keyDown eventlistener
    // so we should check tabPressed in async way
    process.nextTick(() => {
      if (tabPressed) {
        this.setState({ focusedByTab: true });
        tabPressed = false;
      }
    });
  };

  private handleBlur = () => {
    this.setState({
      focusedByTab: false,
      keybordControl: this.props.useGlobalListener || false
    });
  };

  private getItems = (): ItemType[] => {
    return PagingHelper.getItems(
      this.props.activePage,
      this.props.pagesCount
    ).concat('forward');
  };

  private getFocusedItem = (): Nullable<ItemType> => {
    if (!this.state.focusedByTab) {
      return null;
    }

    const { focusedItem } = this.state;
    if (
      focusedItem &&
      this.getItems().indexOf(focusedItem) !== -1 &&
      this.isItemFocusable(focusedItem)
    ) {
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
    let index = items.findIndex(x => x === focusedItem);
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
    if (
      1 <= pageNumber &&
      pageNumber !== this.props.activePage &&
      pageNumber <= this.props.pagesCount
    ) {
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
  onPageChange: func.isRequired
};

const KEYCODE_TAB = 9;

let isListening: boolean;
let tabPressed: boolean;

function listenTabPresses() {
  if (!isListening) {
    events.addEventListener(window, 'keydown', (event: KeyboardEvent) => {
      tabPressed = event.keyCode === KEYCODE_TAB;
    });
    isListening = true;
  }
}

const noop = () => undefined;
