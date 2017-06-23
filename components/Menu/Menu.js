// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import isActiveElement from './isActiveElement';
import ScrollContainer from '../ScrollContainer/ScrollContainer';

import type MenuItem from '../MenuItem/MenuItem';

import styles from './Menu.less';

export default class Menu extends React.Component {
  static defaultProps: {
    maxHeight: number,
    width: number | string
  } = {
    width: 'auto',
    maxHeight: 300
  };

  props: {
    children?: React$Element<*> | React$Element<*>[],
    maxHeight: number,
    onItemClick?: () => void,
    width?: number | string
  };

  state: {
    highlightedIndex: number
  } = {
    highlightedIndex: -1
  };

  _scrollContainer: ScrollContainer;
  _highlighted: MenuItem;

  render() {
    const enableIconPadding = React.Children
      .toArray(this.props.children)
      .some(({ props }) => props.icon);

    if (this._isEmpty()) {
      return null;
    }

    let className = this.props.hasShadow ? styles.shadow : '';

    return (
      <div
        className={styles.root + ' ' + className}
        style={{ width: this.props.width, maxHeight: this.props.maxHeight }}
      >
        <ScrollContainer
          ref={this._refScrollContainer}
          maxHeight={this.props.maxHeight}
        >
          {React.Children.map(this.props.children, (child, index) => {
            const isMenuItem = child && child.type.__MENU_ITEM__;
            const isMenuHeader = child && child.type.__MENU_HEADER__;
            if (enableIconPadding && (isMenuItem || isMenuHeader)) {
              child = React.cloneElement(child, {
                _enableIconPadding: true
              });
            }
            if (isActiveElement(child)) {
              const highlight = this.state.highlightedIndex === index;

              let ref = child.ref;
              if (highlight) {
                ref = this._refHighlighted.bind(this, child.ref);
              }

              return React.cloneElement(child, {
                ref,
                state: highlight ? 'hover' : child.props.state,
                onClick: this._select.bind(this, index, false),
                onMouseEnter: this._highlightItem.bind(this, index),
                onMouseLeave: this._unhighlight
              });
            }
            return child;
          })}
        </ScrollContainer>
      </div>
    );
  }

  up() {
    this._move(-1);
  }

  down() {
    this._move(1);
  }

  enter() {
    return this._select(this.state.highlightedIndex, true);
  }

  reset() {
    this.setState({ highlightedIndex: -1 });
  }

  _refScrollContainer = (scrollContainer: ?ScrollContainer) => {
    this._scrollContainer = scrollContainer;
  };

  _refHighlighted(originalRef, menuItem) {
    this._highlighted = menuItem;

    originalRef && originalRef(menuItem);
  }

  _scrollToSelected = () => {
    this._scrollContainer.scrollTo(ReactDOM.findDOMNode(this._highlighted));
  };

  _select(index: number, shouldHandleHref: boolean) {
    const item = childrenToArray(this.props.children)[index];
    if (isActiveElement(item)) {
      if (shouldHandleHref && item.props.href) {
        if (item.props.target) {
          window.open(item.props.href, item.props.target);
        } else {
          location.href = item.props.href;
        }
      }
      item.props.onClick && item.props.onClick();
      this.props.onItemClick && this.props.onItemClick();
      return true;
    }
    return false;
  }

  _highlightItem(index: number) {
    this.setState({ highlightedIndex: index });
  }

  _unhighlight = () => {
    this.setState({ highlightedIndex: -1 });
  };

  _move(step: number) {
    const children = childrenToArray(this.props.children);
    if (!children.some(isActiveElement)) {
      return;
    }
    let index = this.state.highlightedIndex;
    do {
      index += step;
      if (index < 0) {
        index = children.length - 1;
      } else if (index > children.length) {
        index = 0;
      }

      const child = children[index];
      if (isActiveElement(child)) {
        this.setState({ highlightedIndex: index }, this._scrollToSelected);
        return;
      }
    } while (index !== this.state.highlightedIndex);
  }

  _isEmpty() {
    const { children } = this.props;
    return !children || !childrenToArray(children).filter(isExist).length;
  }
}

function isExist(value) /* : boolean %checks */ {
  return value !== null && value !== undefined;
}

function childrenToArray(children) {
  const ret = [];
  // Use forEach instead of map to avoid cloning for key unifying.
  React.Children.forEach(children, child => {
    ret.push(child);
  });
  return ret;
}
