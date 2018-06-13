import * as React from 'react';

export interface ZIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Приращение к z-index
   */
  delta: number;
  render?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default class ZIndex extends React.Component<ZIndexProps> {
  public static defaultProps = {
    render: true
  };

  private zIndex: number = 0;

  constructor(props: ZIndexProps) {
    super(props);
    this.zIndex = ZIndexStorage.incrementZIndex(this.props.delta);
  }

  public componentWillUnmount() {
    ZIndexStorage.removeZIndex(this.zIndex);
  }

  public render() {
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
  public static incrementZIndex = (delta: number): number => {
    if (delta <= 0) {
      throw new Error();
    }
    const zIndexes = ZIndexStorage.getZIndexes();
    const top = zIndexes[zIndexes.length - 1];
    const zIndex = top + delta;
    zIndexes.push(zIndex);
    return zIndex;
  };

  public static removeZIndex = (zIndex: number): void => {
    const zIndexes = ZIndexStorage.getZIndexes();
    const i = zIndexes.indexOf(zIndex);
    zIndexes.splice(i, 1);
  };

  private static getZIndexes = (): number[] => {
    return global.__RetailUiZIndexes || (global.__RetailUiZIndexes = [0]);
  };
}
