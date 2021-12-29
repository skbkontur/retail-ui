import React from 'react';

import { canUseDOM, isBrowser } from '../../lib/client';
import { Nullable } from '../../typings/utility-types';
import { getRandomID } from '../../lib/utils';
import { Upgrade } from '../../lib/Upgrades';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { RenderInnerContainer } from './RenderInnerContainer';
import { RenderContainerProps } from './RenderContainerTypes';

@rootNode
export class RenderContainer extends React.Component<RenderContainerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderContainer';

  private static getRootId = () => getRandomID();
  private domContainer: Nullable<HTMLElement> = null;
  private setRootNode!: TSetRootNode;

  private readonly rootId: string = RenderContainer.getRootId();

  constructor(props: RenderContainerProps) {
    super(props);

    if (isBrowser && props.children) {
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
    return (
      <RenderInnerContainer
        {...this.props}
        domContainer={this.domContainer}
        rootId={this.rootId}
        ref={this.setRootNode}
      />
    );
  }

  private createContainer() {
    if (canUseDOM) {
      const domContainer = document.createElement('div');
      domContainer.setAttribute('class', Upgrade.getSpecificityClassName());
      domContainer.setAttribute('data-rendered-container-id', `${this.rootId}`);
      this.domContainer = domContainer;
    }
  }

  private mountContainer() {
    if (!this.domContainer) {
      this.createContainer();
    }
    if (this.domContainer && this.domContainer.parentNode !== document.body) {
      document.body.appendChild(this.domContainer);
      if (window.ReactTesting) {
        window.ReactTesting.addRenderContainer(this.rootId, this);
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

      if (window.ReactTesting) {
        window.ReactTesting.removeRenderContainer(this.rootId);
      }
    }
  }
}
