// @flow

import cn from 'classnames';
import events from 'add-event-listener';
import React, { Component } from 'react';
import { number, func } from 'prop-types';
import PagingHelper from './PagingHelper';
import NavigationHelper from './NavigationHelper';

import styles from './Paging.less';

type Props = {
  activePage: number,
  onPageChange: (pageNumber: number) => void,
  pagesCount: number
};

type State = {
  focusedByTab: boolean,
  focusedItem: ?ItemType
};

type ItemType = number | '.' | 'forward';

export default class Paging extends Component {
  static defaultProps = {};

  props: Props;

  state: State = {
    focusedByTab: false,
    focusedItem: null
  };

  componentDidMount() {
    listenTabPresses();
  }

  render() {
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

  _renderItem = (item: ItemType, index: number) => {
    let focused = this._getFocusedItem() === item;
    switch (item) {
      case '.':
        let key = `dots${index < 5 ? 'Left' : 'Right'}`;
        return this._renderDots(key);
      case 'forward':
        let disabled = this._isItemDisabled(item);
        return this._renderForwardLink(item, disabled, focused);
      default:
        let active = this.props.activePage === item;
        return this._renderPageLink(item.toString(), item, active, focused);
    }
  };

  _renderDots = (key: string) => {
    return (
      <span key={key} className={styles.dots}>
        {'...'}
      </span>
    );
  };

  _renderForwardLink = (key, disabled, focused) => {
    let classes = cn({
      [styles.forwardLink]: true,
      [styles.focused]: focused,
      [styles.disabled]: disabled
    });
    return (
      <span
        key={key}
        className={classes}
        onClick={!disabled && this._goForward}
      >
        Дальше
      </span>
    );
  };

  _renderPageLink = (key, pageNumber, active, focused) => {
    let navigationHintText = active ? this._getNavigationHintText() : '';
    let classes = cn({
      [styles.pageLink]: true,
      [styles.focused]: focused,
      [styles.active]: active
    });
    return (
      <span key={key} className={styles.pageLinkWrapper}>
        <span className={classes} onClick={() => this._goToPage(pageNumber)}>
          {pageNumber}
        </span>
        {navigationHintText &&
          <span className={styles.pageLinkHint}>
            {navigationHintText}
          </span>}
      </span>
    );
  };

  _getNavigationHintText = () => {
    let backward = this._canGoBackward() ? '←' : '';
    let forward = this._canGoForward() ? '→' : '';
    return backward || forward
      ? `${backward}${NavigationHelper.getKeyName()}${forward}`
      : '';
  };

  _handleMouseDown = () => {
    this.setState({ focusedByTab: false, focusedItem: null });
  };

  _handleKeyDown = (event: SyntheticKeyboardEvent) => {
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

  _handleFocus = (e: SyntheticFocusEvent) => {
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

  _handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  _getItems = (): ItemType[] => {
    return PagingHelper.getItems(
      this.props.activePage,
      this.props.pagesCount
    ).concat('forward');
  };

  _getFocusedItem = (): ?ItemType => {
    if (!this.state.focusedByTab) {
      return null;
    }

    const { focusedItem } = this.state;
    if (
      focusedItem &&
      this._getItems().indexOf(focusedItem) !== -1 &&
      this._isItemFocusable(focusedItem)
    ) {
      return this.state.focusedItem;
    }

    return this.props.activePage;
  };

  _isItemFocusable = (item: ItemType) => {
    return !this._isItemDisabled(item);
  };

  _isItemDisabled = (item: ItemType) => {
    switch (item) {
      case '.':
        return true;
      case 'forward':
        return !this._canGoForward();
      default:
        return false;
    }
  };

  _executeItemAction = (item: ?ItemType) => {
    if (item === 'forward') {
      this._goForward();
    }
    if (typeof item === 'number') {
      this._goToPage(item);
    }
  };

  _moveFocusLeft = () => {
    this._moveFocus(-1);
  };

  _moveFocusRight = () => {
    this._moveFocus(1);
  };

  _moveFocus = (step: number) => {
    let focusedItem = this._getFocusedItem();
    let items = this._getItems();
    let index = items.findIndex(x => x === focusedItem);
    do {
      index = (index + step + items.length) % items.length;
    } while (!this._isItemFocusable(items[index]));
    this.setState({ focusedItem: items[index] });
  };

  _canGoBackward = (): boolean => {
    return this.props.activePage > 1;
  };

  _canGoForward = (): boolean => {
    return this.props.activePage < this.props.pagesCount;
  };

  _goBackward = () => {
    this._goToPage(this.props.activePage - 1);
  };

  _goForward = () => {
    this._goToPage(this.props.activePage + 1);
  };

  _goToPage = (pageNumber: number) => {
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
  activePage: number.isRequired,
  pagesCount: number.isRequired,
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
