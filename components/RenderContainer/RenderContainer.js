// @flow

import React from 'react';
import ReactDOM from 'react-dom';

let lastID = 0;
function nextID() {
  return ++lastID;
}

export default class RenderContainer extends React.Component {
  _domContainer: HTMLElement;

  _testID: number;

  constructor(props: any, context: any) {
    super(props, context);

    this._domContainer = document.createElement('div');

    if (global.ReactTesting) {
      this._testID = nextID();

      global.ReactTesting.addRenderContainer(this._testID, this);
    }
  }

  render() {
    return <noscript data-render-container-id={this._testID} />;
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

    if (global.ReactTesting) {
      global.ReactTesting.removeRenderContainer(this._testID);
    }
  }

  _renderChild() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      React.Children.only(this.props.children),
      this._domContainer
    );
  }
}
