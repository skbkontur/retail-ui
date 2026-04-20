import isEqual from 'lodash.isequal';
import React from 'react';
import warning from 'warning';

import { LoaderDataTids } from '../../components/Loader/index.js';
import { callChildRef } from '../../lib/callChildRef/callChildRef.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { isBrowser } from '../../lib/globalObject.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { PORTAL_INLET_ATTR, PORTAL_OUTLET_ATTR } from '../RenderContainer/index.js';
import { componentPriorities, incrementZIndex, removeZIndex, upperBorder } from './ZIndexStorage.js';
import type { LayerComponentName } from './ZIndexStorage.js';

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

@withRenderEnvironment
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
  private validateProps(delta: ZIndexProps['delta']): void {
    warning(
      (delta || ZIndex.defaultProps.delta) > 0,
      `[ZIndex]: Prop 'delta' must be greater than 0, received ${delta}`,
    );
    warning(
      Math.trunc(delta || ZIndex.defaultProps.delta) === delta,
      `[ZIndex]: Prop 'delta' must be integer, received ${delta}`,
    );
  }

  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private globalObject!: GlobalObject;
  private zIndexContext: { parentLayerZIndex: number; maxZIndex: number } | null = null;

  public componentDidMount() {
    this.state.zIndex = this.increment();
  }

  public componentDidUpdate(prevProps: Readonly<ZIndexProps>) {
    const props = this.getProps();

    this.validateProps(props.delta);
    if (prevProps.priority !== props.priority || prevProps.delta !== props.delta) {
      removeZIndex(this.state.zIndex, this.globalObject);
      this.setState({ zIndex: this.increment() });
    }
  }

  public componentWillUnmount() {
    removeZIndex(this.state.zIndex, this.globalObject);
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
              isBrowser(this.globalObject) && 'isolation' in this.globalObject.document.body.style
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

    return incrementZIndex(priority, delta, this.globalObject);
  };

  private findClosestWithZIndex = (el: Element | null | undefined) => el?.closest('[style*=z-index]');

  private tryGetContextByDOM = (element: HTMLDivElement) => {
    if (
      this.props.applyZIndex &&
      isEqual(DEFAULT_ZINDEX_CONTEXT, this.zIndexContext) &&
      this.state.DOMZIndexContext === null
    ) {
      let DOMZIndexContext = DEFAULT_ZINDEX_CONTEXT;
      const portal = element.parentElement?.closest(`[${PORTAL_OUTLET_ATTR}]`);

      if (isInstanceOf(portal, this.globalObject.HTMLElement)) {
        const portalID = portal.getAttribute(PORTAL_OUTLET_ATTR);
        const noscript = this.globalObject.document?.querySelector(`noscript[${PORTAL_INLET_ATTR}="${portalID}"]`);
        let parent = this.findClosestWithZIndex(noscript?.parentElement);

        while (isInstanceOf(parent, this.globalObject.HTMLElement)) {
          const styleZIndex = parent.style.zIndex;

          if (styleZIndex) {
            const newZIndex = Number(parent.style.zIndex);

            if (!Number.isNaN(newZIndex)) {
              let maxZIndex = Infinity;

              if (parent.parentElement?.dataset.tid === LoaderDataTids.veil) {
                maxZIndex = this.calcZIndex(newZIndex, maxZIndex);
              }

              DOMZIndexContext = { maxZIndex, parentLayerZIndex: newZIndex };
              break;
            }
          }

          parent = this.findClosestWithZIndex(parent.parentElement);
        }
      }

      this.setState({ DOMZIndexContext });
    }
  };
}
