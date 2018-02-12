// @flow
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
    const children = React.Children.only(this.props.children);
    return this.props.active ? (
      <IgnoreLayerClickWrapper>{children}</IgnoreLayerClickWrapper>
    ) : (
      children
    );
  }
}

type WrapperProps = {
  children: React.Node
};

class IgnoreLayerClickWrapper extends React.Component<WrapperProps> {
  _element: ?Element | Text;

  componentDidMount() {
    this._subscribe(findDOMNode(this));
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return this.props.children;
  }

  _subscribe(element: ?Element | Text) {
    if (element) {
      events.addEventListener(element, 'mousedown', this._handleMouseDown);
      this._element = element;
    }
  }

  _unsubscribe() {
    if (this._element) {
      events.removeEventListener(
        this._element,
        'mousedown',
        this._handleMouseDown
      );
      this._element = null;
    }
  }

  _handleMouseDown = (event: MouseEvent) => {
    event.stopPropagation();
  };
}
