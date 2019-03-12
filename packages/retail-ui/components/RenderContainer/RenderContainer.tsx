import * as React from 'react';
import ReactDOM from 'react-dom';
import { CustomPortal, NativePortal } from './Portal';
import { RootContainer } from './RootContainer';
import { Nullable } from '../../typings/utility-types';

interface RenderContainerProps {
  anchor?: React.ReactNode;
  children?: React.ReactNode;
}

export class RenderContainerBase extends React.Component<RenderContainerProps> {
  public static ids: boolean[] = [true];

  public static getId() {
    return RenderContainerBase.ids.push(true) - 1;
  }
  public static releaseId(rootId: number) {
    RenderContainerBase.ids[rootId] = false;
  }
  public static compactIds() {
    const idsCounter = RenderContainerBase.ids;
    while (idsCounter.length && idsCounter[idsCounter.length - 1] === false) {
      idsCounter.pop();
    }
  }

  protected rootId: number = 0;
  protected domContainer: Nullable<HTMLElement> = null;

  constructor(props: RenderContainerProps) {
    super(props);

    if (props.children) {
      this.mountContainer();
    }
  }

  public componentWillReceiveProps(nextProps: Readonly<RenderContainerProps>): void {
    if (!this.props.children && nextProps.children) {
      this.mountContainer();
    }
    if (this.props.children && !nextProps.children) {
      this.unmountContainer();
    }
  }

  public componentWillUnmount() {
    this.destroyContainer();
  }

  private createContainer() {
    if (!document || !document.body) {
      throw Error('There is no "body" in "document"');
    }

    if (!this.domContainer) {
      RenderContainerBase.compactIds();
      this.rootId = RenderContainerBase.getId();

      const domContainer = document.createElement('div');
      domContainer.setAttribute('class', 'react-ui');
      domContainer.setAttribute('data-rendered-container-id', `${this.rootId}`);
      this.domContainer = domContainer;
    }
  }

  private mountContainer() {
    if (!this.domContainer) {
      this.createContainer();
    }
    if (this.domContainer && this.domContainer.parentNode !== document.body) {
      document.body.appendChild(this.domContainer);
      if (window.ReactTesting) {
        window.ReactTesting.addRenderContainer(this.rootId, this);
      }
    }
  }

  private destroyContainer() {
    if (this.domContainer) {
      this.unmountContainer();
      this.domContainer = null;
      RenderContainerBase.releaseId(this.rootId);
    }
  }

  private unmountContainer() {
    if (this.domContainer && this.domContainer.parentNode) {
      this.domContainer.parentNode.removeChild(this.domContainer);

      if (window.ReactTesting) {
        window.ReactTesting.removeRenderContainer(this.rootId);
      }
    }
  }
}

class RenderContainerNativePortal extends RenderContainerBase {
  public render(): JSX.Element {
    if (this.props.children) {
      if (!this.domContainer) {
        throw Error('There is no "this.domContainer"');
      }

      return (
        <React.Fragment>
          {this.props.anchor}
          {ReactDOM.createPortal(this.props.children, this.domContainer)}
          <NativePortal key="portal-ref" rt_rootID={this.rootId} />
        </React.Fragment>
      );
    }

    return <React.Fragment>{this.props.anchor}</React.Fragment>;
  }
}

class RenderContainerCustomPortal extends RenderContainerBase {
  public render(): JSX.Element {
    return <CustomPortal rt_rootID={this.rootId}>{this.props.anchor}</CustomPortal>;
  }

  public componentDidMount() {
    this.renderChild();
  }

  public componentDidUpdate() {
    this.renderChild();
  }

  public componentWillUnmount() {
    this.unmountChildren();
    super.componentWillUnmount();
  }

  private renderChild() {
    if (this.props.children) {
      this.mountChildren();
    } else {
      this.unmountChildren();
    }
  }
  private mountChildren() {
    if (!this.domContainer) {
      throw Error('There is no "this.domContainer"');
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <RootContainer rt_portalID={this.rootId}>{this.props.children}</RootContainer>,
      this.domContainer,
    );
  }

  private unmountChildren() {
    if (this.domContainer) {
      ReactDOM.unmountComponentAtNode(this.domContainer);
    }
  }
}

const HAS_BUILTIN_PORTAL = !!ReactDOM.createPortal;

export default (HAS_BUILTIN_PORTAL ? RenderContainerNativePortal : RenderContainerCustomPortal);
