// @flow

import React from 'react';
import ReactDOM from 'react-dom';

export default class RenderContainer extends React.Component {
  _domContainer: HTMLElement;

  constructor(props: any, context: any) {
    super(props, context);

    this._domContainer = document.createElement('div');
  }

  render(): null {
    return null;
  }

  componentDidMount() {
    document.body.appendChild(this._domContainer);

    this._renderChild();
  }

  componentDidUpdate() {
    this._renderChild();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._domContainer);
    this._domContainer.parentNode.removeChild(this._domContainer);
  }

  _renderChild() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      React.Children.only(this.props.children),
      this._domContainer
    );
  }
}
