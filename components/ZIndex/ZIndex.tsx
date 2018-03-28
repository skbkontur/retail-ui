// @flow
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import PropTypes from 'prop-types';

export interface ZIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  delta: number;
  render?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default class ZIndex extends React.Component<ZIndexProps> {
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

  private zIndex: number = 0;

  constructor(props: ZIndexProps) {
    super(props);
    this.zIndex = ZIndexStorage.incrementZIndex(this.props.delta);
  }

  componentWillUnmount() {
    ZIndexStorage.removeZIndex(this.zIndex);
  }

  render() {
    const { render, style, children, delta, ...props } = this.props;
    return render ? (
      <div style={{ ...style, zIndex: this.zIndex }} {...props}>
        {children}
      </div>
    ) : (
      children
    );
  }
}

declare const global: {
  __RetailUiZIndexes: number[];
};

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
