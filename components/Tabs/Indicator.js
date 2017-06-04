// @flow

import React from 'react';
import cn from 'classnames';
import LayoutEvents from '../../lib/LayoutEvents';
import throttle from 'lodash.throttle';

import styles from './Indicator.less';

type Props = {
  className?: string,
  getAnchorNode: () => ?Element
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
    const top = node.offsetHeight + node.offsetTop - 3;
    const left = node.offsetLeft;
    return {
      left,
      top,
      width: rect.right - rect.left
    };
  }
}

export default Indicator;
