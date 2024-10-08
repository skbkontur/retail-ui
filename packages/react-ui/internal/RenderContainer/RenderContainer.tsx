import React from 'react';
import { globalObject } from '@skbkontur/global-object';

import { Nullable } from '../../typings/utility-types';
import { getRandomID } from '../../lib/utils';
import { Upgrade } from '../../lib/Upgrades';
import { callChildRef } from '../../lib/callChildRef/callChildRef';
import { RenderLayerConsumer, RenderContainerElement } from '../RenderLayer';

import { RenderInnerContainer } from './RenderInnerContainer';
import { RenderContainerProps } from './RenderContainerTypes';

export const PORTAL_INLET_ATTR = 'data-render-container-id';
export const PORTAL_OUTLET_ATTR = 'data-rendered-container-id';

export class RenderContainer extends React.Component<RenderContainerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderContainer';
  public static displayName = 'RenderContainer';

  private static getRootId = () => getRandomID();
  private domContainer: Nullable<HTMLElement> = null;

  private readonly rootId: string = RenderContainer.getRootId();

  public shouldComponentUpdate(nextProps: RenderContainerProps) {
    if (!this.props.children && nextProps.children) {
      this.mountContainer(undefined);
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
    return this.renderMain();
  }

  private renderMain = () => {
    if (this.props.children) {
      this.mountContainer(root);
    }

    return <RenderInnerContainer {...this.props} domContainer={this.domContainer} rootId={this.rootId} />;
  };

  private createContainer(root: RenderContainerElement) {
    const domContainer = root
      ? root.appendChild(root.ownerDocument.createElement('div'))
      : globalObject.document?.createElement('div');


    if (domContainer) {
      domContainer.setAttribute('class', Upgrade.getSpecificityClassName());
      const root = this.emotion.sheet.container.getRootNode() as ShadowRoot | Document;
      const isShadowRoot = Boolean((root as ShadowRoot)?.host?.shadowRoot);
      if (isShadowRoot) {
        domContainer.setAttribute(
          'style',
          `position: relative; top: -${root.firstElementChild?.getBoundingClientRect().height}px`,
        );
      }
      domContainer.setAttribute(PORTAL_OUTLET_ATTR, `${this.rootId}`);
      this.domContainer = domContainer;
    }
  }

  private mountContainer(root: RenderContainerElement) {
    if (!this.domContainer) {
      this.createContainer(root);
    }

    const rootElement = globalObject.document?.body;
    if (this.domContainer && this.domContainer.parentNode !== rootElement) {
      rootElement?.appendChild(this.domContainer);

      if (this.props.containerRef) {
        callChildRef(this.props.containerRef, this.domContainer);
      }
      if (globalObject.ReactTesting) {
        globalObject.ReactTesting.addRenderContainer(this.rootId, this);
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

      if (globalObject.ReactTesting) {
        globalObject.ReactTesting.removeRenderContainer(this.rootId);
      }
    }
  }
}
