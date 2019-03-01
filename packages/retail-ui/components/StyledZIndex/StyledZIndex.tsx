import * as React from 'react';
import { StyledZIndexView } from './StyledZIndexView';

export interface ZIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Приращение к z-index
   */
  delta: number;
  render?: boolean;
  ignoreHover?: boolean;
  shadow?: boolean;
  entering?: boolean;
  entered?: boolean;
  exiting?: boolean;
  direction: string;
}

export default class StyledZIndex extends React.Component<ZIndexProps> {
  public static defaultProps = {
    render: true,
  };

  private zIndex: number = 0;

  constructor(props: ZIndexProps) {
    super(props);
    this.zIndex = ZIndexStorage.incrementZIndex(this.props.delta);
  }

  public componentWillUnmount() {
    ZIndexStorage.removeZIndex(this.zIndex);
  }

  public render(): JSX.Element {
    const { render, style, children, delta, ...props } = this.props;
    const styles: React.CSSProperties = { ...style, zIndex: this.zIndex };
    return (render ? (
      <StyledZIndexView style={styles} {...props}>
        {children}
      </StyledZIndexView>
    ) : (
      children
    )) as JSX.Element;
  }
}

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
    return window.__RetailUiZIndexes || (window.__RetailUiZIndexes = [0]);
  };
}
