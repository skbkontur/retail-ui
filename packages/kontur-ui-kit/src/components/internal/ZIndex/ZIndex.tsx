import * as React from 'react';
import ZIndexStorage from './ZIndexStorage';

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

  private zIndex: number;

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
