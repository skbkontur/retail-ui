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

    this._testID = nextID();
    this._domContainer.setAttribute(
      'data-rendered-container-id',
      this._testID.toString()
    );

    if (global.ReactTesting) {
      global.ReactTesting.addRenderContainer(this._testID, this);
    }
  }

  render() {
    return <Portal rt_rootID={this._testID} />;
  }

  componentDidMount() {
    const { body } = document;
    if (!body) {
      throw Error('There is no "body" in "document"');
    }
    body.appendChild(this._domContainer);

    this._renderChild();
  }

  componentDidUpdate() {
    this._renderChild();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._domContainer);
    if (this._domContainer.parentNode) {
      this._domContainer.parentNode.removeChild(this._domContainer);
    }

    if (global.ReactTesting) {
      global.ReactTesting.removeRenderContainer(this._testID);
    }
  }

  _renderChild() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <RootContainer rt_portalID={this._testID}>
        {this.props.children}
      </RootContainer>,
      this._domContainer
    );
  }
}

class Portal extends React.Component {
  render() {
    return <noscript data-render-container-id={this.props.rt_rootID} />;
  }
}

function RootContainer(props: { children?: React.Element<*> }) {
  return React.Children.only(props.children);
}
