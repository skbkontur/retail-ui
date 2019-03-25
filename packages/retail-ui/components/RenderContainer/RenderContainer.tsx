import * as React from 'react';
import ReactDOM from 'react-dom';
import { Nullable } from '../../typings/utility-types';
import { RenderInnerContainer as RenderContainerFallback } from './RenderContainerFallback';
import { RenderInnerContainer as RenderContainerNative } from './RenderContainerNative';
import { RenderContainerProps } from './RenderContainerTypes';

let rootId = 0;
const HAS_BUILTIN_PORTAL = !!ReactDOM.createPortal;
const RenderInnerContainer = HAS_BUILTIN_PORTAL ? RenderContainerNative : RenderContainerFallback;

export class RenderContainer extends React.Component<RenderContainerProps> {
  private static getRootId = () => (rootId += 1);
  private domContainer: Nullable<HTMLElement> = null;

  private readonly rootId: number = RenderContainer.getRootId();

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
    return <RenderInnerContainer {...this.props} domContainer={this.domContainer} rootId={this.rootId} />;
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
