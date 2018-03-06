// @flow
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  delta: number,
  render?: boolean,
  children?: React.Node,
  className?: string,
  // eslint-disable-next-line flowtype/no-weak-types
  style?: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  [key: string]: any
};

export default class Zindex extends React.Component<Props> {
  static propTypes = {
    /**
     * Приращение к z-index
     */
    delta: PropTypes.number.isRequired,
    render: PropTypes.bool
  };

  static defaultProps = {
    render: true
  };

  zIndex: number;

  componentWillMount() {
    this.zIndex = ZIndexStorage.incrementZIndex(this.props.delta);
  }

  componentWillUnmount() {
    ZIndexStorage.removeZIndex(this.zIndex);
  }

  render() {
    const { render, style, children, ...props } = this.props;
    delete props.delta;
    return render ? (
      <div style={{ ...style, zIndex: this.zIndex }} {...props}>
        {children}
      </div>
    ) : (
      children
    );
  }
}

class ZIndexStorage {
  static _getZIndexes = (): number[] => {
    return global.__RetailUiZIndexes || (global.__RetailUiZIndexes = [0]);
  };

  static incrementZIndex = (delta: number): number => {
    if (delta <= 0) {
      throw new Error();
    }
    const zIndexes = ZIndexStorage._getZIndexes();
    const top = zIndexes[zIndexes.length - 1];
    const zIndex = top + delta;
    zIndexes.push(zIndex);
    return zIndex;
  };

  static removeZIndex = (zIndex: number): void => {
    const zIndexes = ZIndexStorage._getZIndexes();
    const i = zIndexes.indexOf(zIndex);
    zIndexes.splice(i, 1);
  };
}
