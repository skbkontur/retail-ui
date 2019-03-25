import * as React from 'react';
import ReactDOM from 'react-dom';
import { Nullable } from '../../typings/utility-types';
import { RenderContainer as RenderContainerFallback } from './RenderContainerFallback';
import { RenderContainer as RenderContainerNative } from './RenderContainerNative';
import { RenderContainerProps } from './RenderContainerTypes';

let rootId = 0;
const HAS_BUILTIN_PORTAL = !!ReactDOM.createPortal;

export class RenderContainer extends React.Component<RenderContainerProps> {
  private domContainer: Nullable<HTMLElement> = null;

  private readonly rootId: number = rootId++;

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

  public render() {
    const Container = HAS_BUILTIN_PORTAL ? RenderContainerNative : RenderContainerFallback;

    return <Container {...this.props} domContainer={this.domContainer} rootId={this.rootId} />;
  }

  private createContainer() {
    if (!document || !document.body) {
      throw Error('There is no "body" in "document"');
    }

    if (!this.domContainer) {
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

export default RenderContainer;
