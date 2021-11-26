import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';

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
@rootNode
class IgnoreLayerClickWrapper extends React.Component<WrapperProps> {
  public static __KONTUR_REACT_UI__ = 'IgnoreLayerClick';

  private element: Element | null = null;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    const element = getRootNode(this);
    if (element && element instanceof Element) {
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
    const childWithRef = React.cloneElement(this.props.children as JSX.Element, {
      ref: (instance: Nullable<React.ReactNode>) => {
        this.setRootNode(instance);
        const childAsAny = this.props.children as any;
        if (childAsAny && childAsAny.ref && typeof childAsAny.ref === 'function') {
          childAsAny.ref(instance);
        }
      },
    });
    return React.Children.only(childWithRef);
  }

  private handleMouseDown = (event: Event) => {
    event.stopPropagation();
  };
}
