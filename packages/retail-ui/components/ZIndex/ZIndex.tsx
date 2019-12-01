import * as React from 'react';
import createReactContext from 'create-react-context';
import { incrementZIndex, removeZIndex, upperBorder, LayerComponentName } from './ZIndexStorage';

const ZIndexContext = createReactContext({ parentLayerZIndex: 0, maxZIndex: Infinity });

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
}

export default class ZIndex extends React.Component<ZIndexProps> {
  public static defaultProps = {
    delta: 10,
    priority: 0,
    style: {},
    applyZIndex: true,
    coverChildren: false,
    createStackingContext: false,
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

  private zIndex: number = 0;

  constructor(props: ZIndexProps) {
    super(props);
    this.zIndex = incrementZIndex(props.priority, props.delta);
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
              'isolation' in document.body.style
                ? (wrapperStyle.isolation = 'isolate')
                : (wrapperStyle.transform = 'rotate(0)');
            }
          }

          return (
            <ZIndexContext.Provider value={zIndexContexValue}>
              <div style={{ ...style, ...wrapperStyle }} ref={wrapperRef} {...props}>
                {children}
              </div>
            </ZIndexContext.Provider>
          );
        }}
      </ZIndexContext.Consumer>
    );
  }

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
