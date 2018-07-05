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

export default class RenderContainer extends React.Component<{}> {
  private domContainer: HTMLElement;
  private testID: number;

  constructor(props: {}) {
    super(props);

    this.domContainer = document.createElement('div');
    this.hydrateId();

    this.testID = nextID();
    this.domContainer.setAttribute('data-rendered-container-id', this.testID.toString());
    this.domContainer.className = 'react-ui';

    const { body } = document;
    if (!body) {
      throw Error('There is no "body" in "document"');
    }
    body.appendChild(this.domContainer);
  }

  public componentDidMount() {
    if (!REACT_16) {
      this.renderChild();
    }
  }

  public componentDidUpdate() {
    if (!REACT_16) {
      this.renderChild();
    }
  }

  public componentWillUnmount() {
    if (!REACT_16) {
      ReactDOM.unmountComponentAtNode(this.domContainer);
    }
    if (this.domContainer.parentNode) {
      this.domContainer.parentNode.removeChild(this.domContainer);
    }
  }

  public render() {
    if (REACT_16) {
      return [
        ReactDOM.createPortal(this.props.children, this.domContainer),
        <Portal key="portal-ref" rt_rootID={this.testID} />
      ];
    }
    return <Portal rt_rootID={this.testID} />;
  }

  private hydrateId() {
    const nodes = document.querySelectorAll('[data-rendered-container-id]');
    if (nodes.length === 0) {
      return;
    }
    const lastNode = nodes[nodes.length - 1];
    const containerId = lastNode.getAttribute('data-rendered-container-id');
    if (containerId) {
      setID(parseInt(containerId, 10));
    }
  }

  private renderChild() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <RootContainer rt_portalID={this.testID}>{this.props.children}</RootContainer>,
      this.domContainer
    );
  }
}

const Portal: React.SFC<{ rt_rootID: number }> = ({ children, rt_rootID }) => (
  <noscript data-render-container-id={rt_rootID} />
);

function RootContainer(props: { children?: React.ReactNode; rt_portalID?: number }) {
  return React.Children.only(props.children);
}
