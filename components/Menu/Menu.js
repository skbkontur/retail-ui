// @flow

import React from 'react';

import styles from './Menu.less';

export default class Menu extends React.Component {
  state: {
    highlightedIndex: number,
  } = {
    highlightedIndex: -1,
  };

  render() {
    return (
      <div className={styles.root}>
        {React.Children.map(this.props.children, (child, index) => {
          if (this._canSelect(child)) {
            return React.cloneElement(child, {
              state: this.state.highlightedIndex === index ? 'hover' : null,
              onClick: this._select.bind(this, index),
              onMouseEnter: this._highlightItem.bind(this, index),
              onMouseLeave: this._unhighlight,
            });
          }
          return child;
        })}
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
    return this._select(this.state.highlightedIndex);
  }

  reset() {
    this.setState({highlightedIndex: -1});
  }

  _select(index: number) {
    const item = childrenToArray(this.props.children)[index];
    if (this._canSelect(item)) {
      item.props.onClick && item.props.onClick();
      return true;
    }
    return false;
  }

  _highlightItem(index: number) {
    this.setState({highlightedIndex: index});
  }

  // $FlowIssue 850
  _unhighlight = () => {
    this.setState({highlightedIndex: -1});
  };

  _move(step: number) {
    const children = childrenToArray(this.props.children);
    let index = this.state.highlightedIndex;
    do {
      index += step;
      if (index < 0) {
        index = children.length - 1;
      } else if (index > children.length) {
        index = 0;
      }

      const child = children[index];
      if (this._canSelect(child)) {
        this.setState({highlightedIndex: index});
        return;
      }
    } while (index !== this.state.highlightedIndex);
  }

  _canSelect(element: ?React.Element) {
    return element && element.type.__MENU_ITEM__;
  }
}

function childrenToArray(children) {
  const ret = [];
  // Use forEach instead of map to avoid cloning for key unifying.
  React.Children.forEach(children, child => {
    ret.push(child);
  });
  return ret;
}
