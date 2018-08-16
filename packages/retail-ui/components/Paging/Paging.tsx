import cn from 'classnames';
import events from 'add-event-listener';
import * as React from 'react';
import { number, func } from 'prop-types';
import PagingHelper from './PagingHelper';
import NavigationHelper from './NavigationHelper';
import Icon from '../Icon';

import styles = require('./Paging.less');
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';

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
  component?: React.ComponentType<ItemComponentProps>;
  onPageChange: (pageNumber: number) => void;
  pagesCount: number;
  disabled?: boolean;
  strings?: { forward: string };
  withoutNavigationHint?: boolean;
  caption?: string;
}

export interface PagingState {
  focusedByTab: boolean;
  focusedItem: Nullable<ItemType>;
}

export type ItemType = number | '.' | 'forward';

export default class Paging extends React.Component<PagingProps, PagingState> {
  public static defaultProps = {
    component: ({ className, onClick, children }: any) => (
      <span className={className} onClick={onClick} children={children} />
    ),
    strings: { forward: 'Дальше' }
  };

  public static propTypes = {};

  public static isForward(
    pageNumber: number | 'forward'
  ): boolean /* %checks */ {
    return pageNumber === 'forward';
  }

  public state: PagingState = {
    focusedByTab: false,
    focusedItem: null
  };

  private getProps = createPropsGetter(Paging.defaultProps);

  public componentDidMount() {
    listenTabPresses();
  }

  public render() {
    return (
      <span
        tabIndex={0}
        className={styles.paging}
        onKeyDown={this._handleKeyDown}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        onMouseDown={this._handleMouseDown}
      >
        {this._getItems().map(this._renderItem)}
      </span>
    );
  }

  private _renderItem = (item: ItemType, index: number) => {
    const focused = this._getFocusedItem() === item;
    switch (item) {
      case '.':
        const key = `dots${index < 5 ? 'Left' : 'Right'}`;
        return this._renderDots(key);
      case 'forward':
        const disabled = this._isItemDisabled(item);
        return this._renderForwardLink(disabled, focused);
      default:
        const active = this.props.activePage === item;
        return this._renderPageLink(item, active, focused);
    }
  };

  private _renderDots = (key: string) => {
    return (
      <span key={key} className={styles.dots}>
        {'...'}
      </span>
    );
  };

  private _renderForwardLink = (
    disabled: boolean,
    focused: boolean
  ): JSX.Element => {
    const classes = cn({
      [styles.forwardLink]: true,
      [styles.focused]: focused,
      [styles.disabled]: disabled
    });
    const { component: Component, strings } = this.getProps<
      PagingProps,
      Paging
    >();

    return (
      <Component
        key={'forward'}
        active={false}
        className={classes}
        onClick={disabled ? noop : this._goForward}
        tabIndex={-1}
        pageNumber={'forward' as 'forward'}
      >
        {this.props.caption ? this.props.caption : strings.forward}
        <span className={styles.forwardIcon}>
          <Icon name="ArrowChevronRight" size="18px" />
        </span>
      </Component>
    );
  };

  private _renderPageLink = (
    pageNumber: number,
    active: boolean,
    focused: boolean
  ): JSX.Element => {
    const classes = cn({
      [styles.pageLink]: true,
      [styles.focused]: focused,
      [styles.active]: active
    });
    const { component: Component, withoutNavigationHint } = this.getProps<
      PagingProps,
      Paging
    >();
    return (
      <span key={pageNumber} className={styles.pageLinkWrapper}>
        <Component
          active={active}
          className={classes}
          // tslint:disable-next-line:jsx-no-lambda
          onClick={() => this._goToPage(pageNumber)}
          tabIndex={-1}
          pageNumber={pageNumber}
        >
          {pageNumber}
        </Component>
        {!withoutNavigationHint && active && this._renderNavigationHint()}
      </span>
    );
  };

  private _renderNavigationHint = () => {
    const canGoBackward = this._canGoBackward();
    const canGoForward = this._canGoForward();

    return (
      (canGoBackward || canGoForward) && (
        <span className={styles.pageLinkHint}>
          <span className={canGoBackward ? '' : styles.transparent}>{'←'}</span>
          <span>{NavigationHelper.getKeyName()}</span>
          <span className={canGoForward ? '' : styles.transparent}>{'→'}</span>
        </span>
      )
    );
  };

  private _handleMouseDown = () => {
    this.setState({ focusedByTab: false, focusedItem: null });
  };

  private _handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (NavigationHelper.checkKeyPressed(event) && event.key === 'ArrowLeft') {
      event.preventDefault();
      this.setState({ focusedItem: null }, this._goBackward);
      return;
    }
    if (NavigationHelper.checkKeyPressed(event) && event.key === 'ArrowRight') {
      event.preventDefault();
      this.setState({ focusedItem: null }, this._goForward);
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.setState({ focusedByTab: true }, this._moveFocusLeft);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.setState({ focusedByTab: true }, this._moveFocusRight);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      this._executeItemAction(this._getFocusedItem());
      return;
    }
  };

  private _handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabPressed) {
          this.setState({ focusedByTab: true });
          tabPressed = false;
        }
      });
    }
  };

  private _handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  private _getItems = (): ItemType[] => {
    return PagingHelper.getItems(
      this.props.activePage,
      this.props.pagesCount
    ).concat('forward');
  };

  private _getFocusedItem = (): Nullable<ItemType> => {
    if (!this.state.focusedByTab) {
      return null;
    }

    const { focusedItem } = this.state;
    if (
      focusedItem &&
      this._getItems().indexOf(focusedItem) !== -1 &&
      this._isItemFocusable(focusedItem)
    ) {
      return focusedItem;
    }

    return this.props.activePage;
  };

  private _isItemFocusable = (item: ItemType) => {
    return !this._isItemDisabled(item);
  };

  private _isItemDisabled = (item: ItemType) => {
    switch (item) {
      case '.':
        return true;
      case 'forward':
        return !this._canGoForward();
      default:
        return false;
    }
  };

  private _executeItemAction = (item: Nullable<ItemType>) => {
    if (item === 'forward') {
      this._goForward();
    }
    if (typeof item === 'number') {
      this._goToPage(item);
    }
  };

  private _moveFocusLeft = () => {
    this._moveFocus(-1);
  };

  private _moveFocusRight = () => {
    this._moveFocus(1);
  };

  private _moveFocus = (step: number) => {
    const focusedItem = this._getFocusedItem();
    const items = this._getItems();
    let index = items.findIndex(x => x === focusedItem);
    do {
      index = (index + step + items.length) % items.length;
    } while (!this._isItemFocusable(items[index]));
    this.setState({ focusedItem: items[index] });
  };

  private _canGoBackward = (): boolean => {
    return this.props.activePage > 1;
  };

  private _canGoForward = (): boolean => {
    return this.props.activePage < this.props.pagesCount;
  };

  private _goBackward = () => {
    this._goToPage(this.props.activePage - 1);
  };

  private _goForward = () => {
    this._goToPage(this.props.activePage + 1);
  };

  private _goToPage = (pageNumber: number) => {
    if (
      1 <= pageNumber &&
      pageNumber !== this.props.activePage &&
      pageNumber <= this.props.pagesCount
    ) {
      this.props.onPageChange(pageNumber);
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
