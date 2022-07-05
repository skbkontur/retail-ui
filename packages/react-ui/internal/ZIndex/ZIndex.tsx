import React from 'react';

import { callChildRef } from '../../lib/callChildRef/callChildRef';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { isBrowser } from '../../lib/client';

import { incrementZIndex, removeZIndex, upperBorder, LayerComponentName } from './ZIndexStorage';

const ZIndexContext = React.createContext({ parentLayerZIndex: 0, maxZIndex: Infinity });

ZIndexContext.displayName = 'ZIndexContext';

export interface ZIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Приращение к z-index
   */
  delta: number;
  priority: number | LayerComponentName;
  style: React.CSSProperties;
  createStackingContext?: boolean;
  coverChildren?: boolean;
  applyZIndex?: boolean;
  className?: string;
  wrapperRef?: React.Ref<HTMLDivElement> | undefined | null;

  // Не добавлять обёртку, атрибуты и z-index
  onlyContext: boolean;
}

@rootNode
export class ZIndex extends React.Component<ZIndexProps> {
  public static __KONTUR_REACT_UI__ = 'ZIndex';

  public static defaultProps = {
    delta: 10,
    priority: 0,
    style: {},
    applyZIndex: true,
    coverChildren: false,
    createStackingContext: false,
    onlyContext: false,
  };

  public static propTypes = {
    delta(props: ZIndexProps) {
      if (props.delta <= 0) {
        return new Error(`[ZIndex]: Prop 'delta' must be greater than 0, received ${props.delta}`);
      }
      if (Math.trunc(props.delta) !== props.delta) {
        return new Error(`[ZIndex]: Prop 'delta' must be integer, received ${props.delta}`);
      }
    },
  };

  private zIndex = 0;

  private setRootNode!: TSetRootNode;

  constructor(props: ZIndexProps) {
    super(props);
    this.zIndex = incrementZIndex(props.priority, props.delta);
  }

  public componentDidUpdate(prevProps: Readonly<ZIndexProps>) {
    if (prevProps.priority !== this.props.priority || prevProps.delta !== this.props.delta) {
      this.zIndex = incrementZIndex(this.props.priority, this.props.delta);
      this.forceUpdate();
    }
  }

  public componentWillUnmount() {
    removeZIndex(this.zIndex);
  }

  public render() {
    const {
      style,
      children,
      delta,
      priority,
      applyZIndex,
      coverChildren,
      createStackingContext,
      wrapperRef,
      onlyContext,
      ...props
    } = this.props;

    const wrapperStyle: React.CSSProperties = {};

    return (
      <ZIndexContext.Consumer>
        {({ parentLayerZIndex, maxZIndex }) => {
          let zIndexContexValue = { parentLayerZIndex, maxZIndex };

          if (applyZIndex) {
            const newZIndex = this.calcZIndex(parentLayerZIndex, maxZIndex);
            wrapperStyle.zIndex = newZIndex;

            zIndexContexValue = coverChildren
              ? { parentLayerZIndex, maxZIndex: newZIndex }
              : { parentLayerZIndex: newZIndex, maxZIndex: Number.isFinite(maxZIndex) ? newZIndex : Infinity };

            if (createStackingContext) {
              isBrowser && 'isolation' in document.body.style
                ? (wrapperStyle.isolation = 'isolate')
                : (wrapperStyle.transform = 'rotate(0)');
            }
          }

          const child = onlyContext ? (
            children
          ) : (
            <div style={{ ...style, ...wrapperStyle }} ref={this.wrapperRef} {...props}>
              {children}
            </div>
          );

          return <ZIndexContext.Provider value={zIndexContexValue}>{child}</ZIndexContext.Provider>;
        }}
      </ZIndexContext.Consumer>
    );
  }

  private wrapperRef = (element: HTMLDivElement | null) => {
    const { wrapperRef } = this.props;
    this.setRootNode(element);
    wrapperRef && callChildRef(wrapperRef, element);
  };

  private calcZIndex(parentLayerZIndex: number, maxZIndex: number) {
    let newZIndex = this.zIndex;

    if (Number.isFinite(maxZIndex)) {
      const allowedValuesIntervalLength = maxZIndex - parentLayerZIndex;
      const scale = upperBorder / allowedValuesIntervalLength;
      newZIndex = Math.ceil(newZIndex / scale);
    }

    newZIndex += parentLayerZIndex;

    return newZIndex;
  }
}
