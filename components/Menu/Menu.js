// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import ScrollContainer from '../ScrollContainer/ScrollContainer';

import styles from './Menu.less';

export default class Menu extends React.Component {
  state: {
    highlightedIndex: number,
  } = {
    highlightedIndex: -1,
  };

  _scrollContainer: ScrollContainer;
  _highlighted: any;
  _highlightedItemRef: ?((el: any) => void);

  render() {
    return (
      <div className={styles.root}>
        <ScrollContainer ref={this._refScrollContainer} maxHeight={200}>
          {React.Children.map(this.props.children, (child, index) => {
            if (this._canSelect(child)) {
              const highlight = this.state.highlightedIndex === index;

              let ref = child.ref;
              if (highlight) {
                this._highlightedItemRef = ref;
                ref = this._refHighlighted;
              }

              return React.cloneElement(child, {
                ref,
                state: highlight ? 'hover' : null,
                onClick: this._select.bind(this, index),
                onMouseEnter: this._highlightItem.bind(this, index),
                onMouseLeave: this._unhighlight,
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
    return this._select(this.state.highlightedIndex);
  }

  reset() {
    this.setState({highlightedIndex: -1});
  }

  _refScrollContainer: Function = scrollContainer => {
    this._scrollContainer = scrollContainer;
  };

  _refHighlighted: Function = menuItem => {
    this._highlighted = menuItem;

    const originalRef = this._highlightedItemRef;
    originalRef && originalRef(menuItem);
  };

  _scrollToSelected: Function = () => {
    this._scrollContainer.scrollTo(ReactDOM.findDOMNode(this._highlighted));
  };

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

  _unhighlight: Function = () => {
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
        this.setState({highlightedIndex: index}, this._scrollToSelected);
        return;
      }
    } while (index !== this.state.highlightedIndex);
  }

  _canSelect(element: ?React.Element<*>) {
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
