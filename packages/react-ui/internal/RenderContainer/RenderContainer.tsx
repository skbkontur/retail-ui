import React from 'react';
import { globalObject } from '@skbkontur/global-object';

import { Nullable } from '../../typings/utility-types';
import { getRandomID } from '../../lib/utils';
import { Upgrade } from '../../lib/Upgrades';
import { callChildRef } from '../../lib/callChildRef/callChildRef';

import { RenderInnerContainer } from './RenderInnerContainer';
import { RenderContainerProps } from './RenderContainerTypes';

export class RenderContainer extends React.Component<RenderContainerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderContainer';

  private static getRootId = () => getRandomID();
  private domContainer: Nullable<HTMLElement> = null;

  private readonly rootId: string = RenderContainer.getRootId();

  constructor(props: RenderContainerProps) {
    super(props);

    if (props.children) {
      this.mountContainer();
    }
  }

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
    return <RenderInnerContainer {...this.props} domContainer={this.domContainer} rootId={this.rootId} />;
  }

  private createContainer() {
    const domContainer = globalObject.document?.createElement('div');
    if (domContainer) {
      domContainer.setAttribute('class', Upgrade.getSpecificityClassName());
      domContainer.setAttribute('data-rendered-container-id', `${this.rootId}`);
      this.domContainer = domContainer;
    }
  }

  private mountContainer() {
    if (!this.domContainer) {
      this.createContainer();
    }
    if (this.domContainer && this.domContainer.parentNode !== globalObject.document?.body) {
      globalObject.document?.body.appendChild(this.domContainer);

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
