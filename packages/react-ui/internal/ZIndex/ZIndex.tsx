import React from 'react';
import { globalObject, isBrowser } from '@skbkontur/global-object';
import isEqual from 'lodash.isequal';

import { callChildRef } from '../../lib/callChildRef/callChildRef';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isInstanceOf } from '../../lib/isInstanceOf';
import { LoaderDataTids } from '../../components/Loader';
import { PORTAL_INLET_ATTR, PORTAL_OUTLET_ATTR } from '../RenderContainer';

import { incrementZIndex, removeZIndex, upperBorder, LayerComponentName, componentPriorities } from './ZIndexStorage';

const DEFAULT_ZINDEX_CONTEXT = { parentLayerZIndex: 0, maxZIndex: Infinity };

const ZIndexContext = React.createContext(DEFAULT_ZINDEX_CONTEXT);

ZIndexContext.displayName = 'ZIndexContext';

export interface ZIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Приращение к z-index
   */
  delta?: number;
  priority?: number | LayerComponentName;
  style?: React.CSSProperties;
  createStackingContext?: boolean;
  coverChildren?: boolean;
  applyZIndex?: boolean;
  className?: string;
  wrapperRef?: React.Ref<HTMLDivElement> | undefined | null;

  /**
   * Явно указывает, что вложенные элементы должны быть обёрнуты в `<div/>`.
   * Для случаев, когда необходимо задать **только** контекст для области.
   *
   * @default true
   */
  useWrapper?: boolean;
}

type DefaultProps = Required<
  Pick<
    ZIndexProps,
    'delta' | 'priority' | 'style' | 'applyZIndex' | 'coverChildren' | 'createStackingContext' | 'useWrapper'
  >
>;

interface ZIndexState {
  zIndex: number;
  DOMZIndexContext: { parentLayerZIndex: number; maxZIndex: number } | null;
}

@rootNode
export class ZIndex extends React.Component<ZIndexProps, ZIndexState> {
  public static priorities = componentPriorities;
  public static __KONTUR_REACT_UI__ = 'ZIndex';
  public static displayName = 'ZIndex';

  public static defaultProps: DefaultProps = {
    delta: 10,
    priority: 0,
    style: {},
    applyZIndex: true,
    coverChildren: false,
    createStackingContext: false,
    useWrapper: true,
  };

  public state: ZIndexState = {
    zIndex: 0,
    DOMZIndexContext: null,
  };

  private getProps = createPropsGetter(ZIndex.defaultProps);

  public static propTypes = {
    delta(props: ZIndexProps) {
      if ((props.delta || ZIndex.defaultProps.delta) <= 0) {
        return new Error(`[ZIndex]: Prop 'delta' must be greater than 0, received ${props.delta}`);
      }
      if (Math.trunc(props.delta || ZIndex.defaultProps.delta) !== props.delta) {
        return new Error(`[ZIndex]: Prop 'delta' must be integer, received ${props.delta}`);
      }
    },
  };

  private setRootNode!: TSetRootNode;
  private zIndexContext: { parentLayerZIndex: number; maxZIndex: number } | null = null;

  constructor(props: ZIndexProps) {
    super(props);
    this.state.zIndex = this.increment();
  }

  public componentDidUpdate(prevProps: Readonly<ZIndexProps>) {
    if (prevProps.priority !== this.props.priority || prevProps.delta !== this.props.delta) {
      removeZIndex(this.state.zIndex);
      this.setState({ zIndex: this.increment() });
    }
  }

  public componentWillUnmount() {
    removeZIndex(this.state.zIndex);
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
      useWrapper,
      ...rest
    } = this.getProps();

    const wrapperStyle: React.CSSProperties = {};

    return (
      <ZIndexContext.Consumer>
        {(context) => {
          this.zIndexContext = context;

          const currentZIndexContext =
            this.state.DOMZIndexContext && isEqual(context, DEFAULT_ZINDEX_CONTEXT)
              ? this.state.DOMZIndexContext
              : context;
          const { parentLayerZIndex, maxZIndex } = currentZIndexContext;

          let newZIndexContext = currentZIndexContext;
          let newZIndex = 0;

          if (applyZIndex) {
            newZIndex = this.calcZIndex(parentLayerZIndex, maxZIndex);
            wrapperStyle.zIndex = newZIndex;

            newZIndexContext = coverChildren
              ? { parentLayerZIndex, maxZIndex: newZIndex }
              : { parentLayerZIndex: newZIndex, maxZIndex: Number.isFinite(maxZIndex) ? newZIndex : Infinity };

            if (createStackingContext) {
              isBrowser(globalObject) && 'isolation' in globalObject.document.body.style
                ? (wrapperStyle.isolation = 'isolate')
                : (wrapperStyle.transform = 'rotate(0)');
            }
          }

          const child = !useWrapper ? (
            children
          ) : (
            <div style={{ ...style, ...wrapperStyle }} ref={this.wrapperRef} {...rest}>
              {children}
            </div>
          );

          return <ZIndexContext.Provider value={newZIndexContext}>{child}</ZIndexContext.Provider>;
        }}
      </ZIndexContext.Consumer>
    );
  }

  private wrapperRef = (element: HTMLDivElement | null) => {
    const { wrapperRef } = this.props;
    this.setRootNode(element);
    wrapperRef && callChildRef(wrapperRef, element);
    element && this.tryGetContextByDOM(element);
  };

  private calcZIndex(parentLayerZIndex: number, maxZIndex: number) {
    let newZIndex = this.state.zIndex;

    if (Number.isFinite(maxZIndex)) {
      const allowedValuesIntervalLength = maxZIndex - parentLayerZIndex;
      const scale = upperBorder / allowedValuesIntervalLength;
      newZIndex = Math.ceil(newZIndex / scale);
    }

    newZIndex += parentLayerZIndex;

    return newZIndex;
  }

  private increment = () => {
    const { priority, delta } = this.getProps();

    return incrementZIndex(priority, delta);
  };

  private tryGetContextByDOM = (element: HTMLDivElement) => {
    if (
      this.props.applyZIndex &&
      isEqual(DEFAULT_ZINDEX_CONTEXT, this.zIndexContext) &&
      this.state.DOMZIndexContext === null
    ) {
      let DOMZIndexContext = DEFAULT_ZINDEX_CONTEXT;
      const portal = element.parentElement?.closest(`[${PORTAL_OUTLET_ATTR}]`);

      if (isInstanceOf(portal, globalObject.HTMLElement)) {
        const portalID = portal.getAttribute(PORTAL_OUTLET_ATTR);
        const noscript = globalObject.document?.querySelector(`noscript[${PORTAL_INLET_ATTR}="${portalID}"]`);
        const parent = noscript?.parentElement?.closest('[style*=z-index]');

        if (isInstanceOf(parent, globalObject.HTMLElement)) {
          const newZIndex = Number(parent.style.zIndex || 0);

          let maxZIndex = Infinity;

          if (parent.parentElement?.dataset.tid === LoaderDataTids.veil) {
            maxZIndex = this.calcZIndex(newZIndex, maxZIndex);
          }

          DOMZIndexContext = { maxZIndex, parentLayerZIndex: newZIndex };
        }
      }

      this.setState({ DOMZIndexContext });
    }
  };
}
