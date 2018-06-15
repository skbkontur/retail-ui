

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import LayoutEvents from '../../lib/LayoutEvents';
import throttle from 'lodash.throttle';
import Tab from './Tab';

import styles from './Indicator.less';

type Props = {
  className?: string,
  getAnchorNode: () => Tab | null,
  tabUpdates: {
    on: (() => void) => () => void
  },
  vertical: boolean
};

type Styles = {
  height?: number,
  left?: number,
  top?: number,
  width?: number
};

type State = {
  styles: Styles
};

class Indicator extends React.Component<Props, State> {
  state: State = {
    styles: {}
  };

  _eventListener = null;
  _removeTabUpdatesListener: ?() => void = null;

  componentDidMount() {
    this._eventListener = LayoutEvents.addListener(throttle(this._reflow, 100));
    this._removeTabUpdatesListener = this.props.tabUpdates.on(this._reflow);
    this._reflow();
  }

  componentWillUnmount() {
    if (this._eventListener) {
      this._eventListener.remove();
    }
    if (this._removeTabUpdatesListener) {
      this._removeTabUpdatesListener();
    }
  }

  componentDidUpdate(_: Props, prevState: State) {
    this._reflow();
  }

  render() {
    const node = this.props.getAnchorNode();
    const indicators =
      (node && node.getIndicators && node.getIndicators()) || {};
    return (
      <div
        className={cn(
          styles.root,
          indicators.primary && styles.primary,
          indicators.success && styles.success,
          indicators.warning && styles.warning,
          indicators.error && styles.error,
          this.props.className
        )}
        style={this.state.styles}
      />
    );
  }

  _reflow = () => {
    const node = this.props.getAnchorNode();
    const underlyingNode = node && node.getUnderlyingNode();
    const styles = this._getStyles(underlyingNode);
    const stylesUpdated = ['left', 'top', 'width', 'height'].some(
      prop => styles[prop] !== this.state.styles[prop]
    );
    if (stylesUpdated) {
      this.setState({ styles });
    }
  };

  _getStyles(node): Styles {
    if (node instanceof React.Component) {
      node = findDOMNode(node);
    }

    if (!node) {
      return {};
    }

    // better to check node instanceof HTMLElement
    // but it fails in ie8
    // eslint-disable-next-line flowtype/no-weak-types
    const _node: HTMLElement = (node: any);

    const rect = _node.getBoundingClientRect();
    if (this.props.vertical) {
      return {
        width: 3,
        left: _node.offsetLeft,
        top: _node.offsetTop,
        height: rect.bottom - rect.top
      };
    }
    return {
      left: _node.offsetLeft,
      top: _node.offsetHeight + _node.offsetTop - 3,
      width: rect.right - rect.left
    };
  }
}

export default Indicator;
