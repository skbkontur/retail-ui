import * as React from 'react';
import { findDOMNode } from 'react-dom';
import events from 'add-event-listener';

export interface IgnoreLayerClickProps {
  children: React.ReactNode;
  active: boolean;
}

export default class IgnoreLayerClick extends React.Component<
  IgnoreLayerClickProps
> {
  public render() {
    const child = React.Children.only(this.props.children);
    return this.props.active ? (
      <IgnoreLayerClickWrapper>{child}</IgnoreLayerClickWrapper>
    ) : (
      child
    );
  }
}

interface WrapperProps {
  children: React.ReactNode;
}

class IgnoreLayerClickWrapper extends React.Component<WrapperProps> {
  private _element: Element | null = null;

  public componentDidMount() {
    const element = findDOMNode(this) as Element;
    if (element) {
      events.addEventListener(element, 'mousedown', this._handleMouseDown);
      this._element = element;
    }
  }

  public componentWillUnmount() {
    if (this._element) {
      events.removeEventListener(
        this._element,
        'mousedown',
        this._handleMouseDown
      );
      this._element = null;
    }
  }

  public render(): JSX.Element {
    return React.Children.only(this.props.children);
  }

  public _handleMouseDown = (event: MouseEvent) => {
    event.stopPropagation();
  };
}
