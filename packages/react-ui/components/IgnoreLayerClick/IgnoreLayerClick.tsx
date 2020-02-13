import React from 'react';
import { findDOMNode } from 'react-dom';

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
class IgnoreLayerClickWrapper extends React.Component<WrapperProps> {
  public static __KONTUR_REACT_UI__ = 'IgnoreLayerClick';

  private element: Element | null = null;

  public componentDidMount() {
    const element = findDOMNode(this);
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
    return React.Children.only(this.props.children);
  }

  private handleMouseDown = (event: Event) => {
    event.stopPropagation();
  };
}
