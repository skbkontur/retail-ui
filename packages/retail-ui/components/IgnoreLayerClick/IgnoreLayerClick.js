
/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import events from 'add-event-listener';

type Props = {
  children: React.Node,
  active: boolean
};

export default class IgnoreLayerClick extends React.Component<Props> {
  render() {
    const child = React.Children.only(this.props.children);
    return this.props.active ? (
      <IgnoreLayerClickWrapper>{child}</IgnoreLayerClickWrapper>
    ) : (
      child
    );
  }
}

type WrapperProps = {
  children: React.Node
};

class IgnoreLayerClickWrapper extends React.Component<WrapperProps> {
  _element: ?Element | Text;

  componentDidMount() {
    const element = findDOMNode(this);
    if (element) {
      events.addEventListener(element, 'mousedown', this._handleMouseDown);
      this._element = element;
    }
  }

  componentWillUnmount() {
    if (this._element) {
      events.removeEventListener(
        this._element,
        'mousedown',
        this._handleMouseDown
      );
      this._element = null;
    }
  }

  render() {
    return this.props.children;
  }

  _handleMouseDown = (event: MouseEvent) => {
    event.stopPropagation();
  };
}
