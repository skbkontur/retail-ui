import * as React from 'react';
import ReactDOM from 'react-dom';

interface RenderContainerProps {
  anchor?: React.ReactNode;
}

const REACT_16 = !!ReactDOM.createPortal;

export default class RenderContainer extends React.Component<RenderContainerProps> {
  public static lastId = 0;

  private domContainer: HTMLElement;
  private rootId: number;

  constructor(props: RenderContainerProps) {
    super(props);

    this.domContainer = document.createElement('div');
    this.hydrateId();

    this.rootId = this.nextId();
    this.domContainer.setAttribute('data-rendered-container-id', `${this.rootId}`);
    this.domContainer.className = 'react-ui';

    const { body } = document;
    if (!body) {
      throw Error('There is no "body" in "document"');
    }
    body.appendChild(this.domContainer);

    // @ts-ignore
    if (window.ReactTesting) {
      // @ts-ignore
      window.ReactTesting.addRenderContainer(this.rootId, this);
    }
  }

  public render(): JSX.Element {
    if (REACT_16) {
      return (
        <React.Fragment>
          {this.props.anchor}
          {ReactDOM.createPortal(this.props.children, this.domContainer)}
          <Portal key="portal-ref" rt_rootID={this.rootId} />
        </React.Fragment>
      );
    }
    return <Portal rt_rootID={this.rootId}>{this.props.anchor}</Portal>;
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

    // @ts-ignore
    if (window.ReactTesting) {
      // @ts-ignore
      window.ReactTesting.removeRenderContainer(this.rootId);
    }
  }

  private nextId() {
    return ++RenderContainer.lastId;
  }

  private setId(id: number) {
    RenderContainer.lastId = id;
  }

  private hydrateId() {
    const nodes = document.querySelectorAll('[data-rendered-container-id]');
    if (nodes.length === 0) {
      return;
    }
    const lastNode = nodes[nodes.length - 1];
    const containerId = +(lastNode.getAttribute('data-rendered-container-id') || 0);
    this.setId(containerId);
  }

  private renderChild() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <RootContainer rt_portalID={this.rootId}>{this.props.children}</RootContainer>,
      this.domContainer,
    );
  }
}

class Portal extends React.Component<{ rt_rootID: number }> {
  public componentDidMount() {
    if (!this.props.children) {
      return;
    }

    const element = ReactDOM.findDOMNode(this);

    if (element && element instanceof Element) {
      const rootId = element.getAttribute('data-render-container-id');
      const rootIdAttribute = rootId ? `${rootId} ${this.props.rt_rootID}` : `${this.props.rt_rootID}`;

      element.setAttribute('data-render-container-id', rootIdAttribute);
    }
  }

  public render() {
    return this.props.children || <noscript data-render-container-id={this.props.rt_rootID} />;
  }
}

function RootContainer(props: { children?: React.ReactNode; rt_portalID: number }) {
  return React.Children.only(props.children);
}
