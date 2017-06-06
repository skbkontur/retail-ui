// @flow

import React from 'react';
import cn from 'classnames';
import LayoutEvents from '../../lib/LayoutEvents';
import throttle from 'lodash.throttle';

import styles from './Indicator.less';

type Props = {
  className?: string,
  getAnchorNode: () => ?Element,
  vertical: boolean
};

class Indicator extends React.Component {
  props: Props;

  _eventListener = null;

  componentDidMount() {
    this._eventListener = LayoutEvents.addListener(
      throttle(() => this.forceUpdate(), 100)
    );
  }

  componentWillUnmount() {
    if (this._eventListener) {
      this._eventListener.remove();
    }
  }

  render() {
    const node = this.props.getAnchorNode();

    if (!node) {
      return null;
    }

    return (
      <div
        className={cn(styles.root, styles.className)}
        style={this._getStyles(node)}
      />
    );
  }

  _getStyles(node) {
    if (!(node instanceof HTMLElement)) {
      return {};
    }

    const rect = node.getBoundingClientRect();
    if (this.props.vertical) {
      return {
        width: 3,
        left: node.offsetLeft,
        top: node.offsetTop,
        height: rect.bottom - rect.top
      };
    }
    return {
      left: node.offsetLeft,
      top: node.offsetHeight + node.offsetTop - 3,
      width: rect.right - rect.left
    };
  }
}

export default Indicator;
