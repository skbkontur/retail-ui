import * as React from 'react';
import ReactDOM from 'react-dom';

let lastID = 0;
function nextID() {
  return ++lastID;
}
function setID(id: number) {
  lastID = id;
}

const REACT_16 = !!ReactDOM.createPortal;

export default class RenderContainer extends React.Component<{
  anchor?: React.ReactNode;
}> {
  private _domContainer: HTMLElement;

  private _testID: number;

  constructor(props: {}, context: {}) {
    super(props, context);

    this._domContainer = document.createElement('div');
    this._hydrateId();

    this._testID = nextID();
    this._domContainer.setAttribute(
      'data-rendered-container-id',
      this._testID.toString()
    );
    this._domContainer.className = 'react-ui';

    const { body } = document;
    if (!body) {
      throw Error('There is no "body" in "document"');
    }
    body.appendChild(this._domContainer);

    // @ts-ignore
    if (window.ReactTesting) {
      // @ts-ignore
      window.ReactTesting.addRenderContainer(this._testID, this);
    }
  }

  public render(): JSX.Element {
    if (REACT_16) {
      return [
        ReactDOM.createPortal(this.props.children, this._domContainer),
        <Portal key="portal-ref" rt_rootID={this._testID}>
          {this.props.anchor}
        </Portal>
      ] as any; // FIXME: To support ts typings for react@15, render should return JSX.Element
    }
    return <Portal rt_rootID={this._testID}>{this.props.anchor}</Portal>;
  }

  public componentDidMount() {
    if (!REACT_16) {
      this._renderChild();
    }
  }

  public componentDidUpdate() {
    if (!REACT_16) {
      this._renderChild();
    }
  }

  public componentWillUnmount() {
    if (!REACT_16) {
      ReactDOM.unmountComponentAtNode(this._domContainer);
    }
    if (this._domContainer.parentNode) {
      this._domContainer.parentNode.removeChild(this._domContainer);
    }

    // @ts-ignore
    if (window.ReactTesting) {
      // @ts-ignore
      window.ReactTesting.removeRenderContainer(this._testID);
    }
  }

  private _hydrateId() {
    const nodes = document.querySelectorAll('[data-rendered-container-id]');
    if (nodes.length === 0) {
      return;
    }
    const lastNode = nodes[nodes.length - 1];
    const containerId = +(
      lastNode.getAttribute('data-rendered-container-id') || 0
    );
    setID(containerId);
  }

  private _renderChild() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <RootContainer rt_portalID={this._testID}>
        {this.props.children}
      </RootContainer>,
      this._domContainer
    );
  }
}

class Portal extends React.Component<{ rt_rootID: number }> {
  public componentDidMount() {
    const element = ReactDOM.findDOMNode(this);

    if (element && element instanceof Element) {
      element.setAttribute(
        'data-render-container-id',
        String(this.props.rt_rootID)
      );
    }
  }

  public render() {
    return (
      this.props.children || (
        <noscript data-render-container-id={this.props.rt_rootID} />
      )
    );
  }
}

function RootContainer(props: {
  children?: React.ReactNode;
  rt_portalID: number;
}) {
  return React.Children.only(props.children);
}
