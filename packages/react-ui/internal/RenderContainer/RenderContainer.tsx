import React from 'react';

import { callChildRef } from '../../lib/callChildRef/callChildRef.js';
import { RenderEnvironmentContext } from '../../lib/renderEnvironment/index.js';
import type { RenderEnvironmentContextType } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode } from '../../lib/rootNode/rootNodeDecorator.js';
import { Upgrade } from '../../lib/Upgrades.js';
import { getRandomID } from '../../lib/utils.js';
import type { Nullable } from '../../typings/utility-types.js';
import type { RenderContainerProps } from './RenderContainerTypes.js';
import { RenderInnerContainer } from './RenderInnerContainer.js';

interface GlobalWithReactTesting {
  ReactTesting?: any;
}

export const PORTAL_INLET_ATTR = 'data-render-container-id';
export const PORTAL_OUTLET_ATTR = 'data-rendered-container-id';

export class RenderContainer extends React.Component<RenderContainerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderContainer';
  public static displayName = 'RenderContainer';

  public static contextType = RenderEnvironmentContext;
  public context!: RenderEnvironmentContextType;

  private static getRootId = () => getRandomID();
  // see #2873 and #2895
  public static readonly defaultRootNode = null;
  private domContainer: Nullable<HTMLElement> = RenderContainer.defaultRootNode;

  private readonly rootId: string = RenderContainer.getRootId();

  public getRootNode: TGetRootNode = (): Nullable<Element> => this.domContainer;

  public shouldComponentUpdate(nextProps: RenderContainerProps) {
    if (!this.props.children && nextProps.children) {
      this.mountContainer();
    }
    if (this.props.children && !nextProps.children) {
      this.unmountContainer();
    }
    return true;
  }

  public componentWillUnmount() {
    this.destroyContainer();
  }

  public render() {
    if (this.props.children) {
      this.mountContainer();
    }

    return <RenderInnerContainer {...this.props} domContainer={this.domContainer} rootId={this.rootId} />;
  }

  private createContainer() {
    const domContainer = this.context.globalObject.document?.createElement('div');
    if (domContainer) {
      domContainer.setAttribute('class', Upgrade.getSpecificityClassName());
      domContainer.setAttribute(PORTAL_OUTLET_ATTR, `${this.rootId}`);
      this.domContainer = domContainer;
    }
  }

  private mountContainer() {
    const globalWithReactTesting = this.context.globalObject as GlobalWithReactTesting;

    if (!this.domContainer) {
      this.createContainer();
    }
    if (this.domContainer && this.domContainer.parentNode !== this.context.globalObject.document?.body) {
      this.context.globalObject.document?.body.appendChild(this.domContainer);

      if (this.props.containerRef) {
        callChildRef(this.props.containerRef, this.domContainer);
      }
      if (globalWithReactTesting.ReactTesting) {
        globalWithReactTesting.ReactTesting.addRenderContainer(this.rootId, this);
      }
    }
  }

  private destroyContainer() {
    if (this.domContainer) {
      this.unmountContainer();
      this.domContainer = null;
    }
  }

  private unmountContainer() {
    if (this.domContainer && this.domContainer.parentNode) {
      this.domContainer.parentNode.removeChild(this.domContainer);

      if (this.props.containerRef) {
        callChildRef(this.props.containerRef, null);
      }

      const globalWithReactTesting = this.context.globalObject as GlobalWithReactTesting;
      if (globalWithReactTesting.ReactTesting) {
        globalWithReactTesting.ReactTesting.removeRenderContainer(this.rootId);
      }
    }
  }
}
