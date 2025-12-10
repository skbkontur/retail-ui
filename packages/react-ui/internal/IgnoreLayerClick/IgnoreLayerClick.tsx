import React from 'react';

import type { GlobalObject } from '../../lib/globalObject.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import { CommonWrapper } from '../CommonWrapper/index.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

export interface IgnoreLayerClickProps {
  children: React.ReactNode;
  active: boolean;
}

export class IgnoreLayerClick extends React.Component<IgnoreLayerClickProps> {
  public render() {
    const child = React.Children.only(this.props.children);
    return this.props.active ? <IgnoreLayerClickWrapper>{child}</IgnoreLayerClickWrapper> : child;
  }
}

interface WrapperProps {
  children: React.ReactNode;
}

// NOTE Используется только в команде Контур.Бухгалтерия
@withRenderEnvironment
@rootNode
class IgnoreLayerClickWrapper extends React.Component<WrapperProps> {
  public static __KONTUR_REACT_UI__ = 'IgnoreLayerClick';
  public static displayName = 'IgnoreLayerClick';

  private globalObject!: GlobalObject;
  private element: Element | null = null;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    const element = getRootNode(this);
    if (isInstanceOf(element, this.globalObject.Element)) {
      element.addEventListener('mousedown', this.handleMouseDown);
      this.element = element;
    }
  }

  public componentWillUnmount() {
    if (this.element) {
      this.element.removeEventListener('mousedown', this.handleMouseDown);
      this.element = null;
    }
  }

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {React.Children.only(this.props.children)}
      </CommonWrapper>
    );
  }

  private handleMouseDown = (event: Event) => {
    event.stopPropagation();
  };
}
