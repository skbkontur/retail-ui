import React from 'react';
import ReactDOM from 'react-dom';
import { Nullable } from '../../typings/utility-types';
import { PortalProps, RenderContainerProps } from './RenderContainerTypes';

interface RenderContainerFallbackProps extends RenderContainerProps {
  domContainer: Nullable<HTMLElement>;
  rootId: number;
}

export function RootContainer(props: { children?: React.ReactNode; rt_portalID: number }) {
  return React.Children.only(props.children);
}

export class Portal extends React.Component<PortalProps> {
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

export class RenderInnerContainer extends React.Component<RenderContainerFallbackProps> {
  public render(): JSX.Element {
    return <Portal rt_rootID={this.props.rootId}>{this.props.anchor}</Portal>;
  }

  public componentDidMount() {
    this.renderChildren();
  }

  public componentDidUpdate() {
    this.renderChildren();
  }

  public componentWillUnmount() {
    this.unmountChildren();
  }

  private renderChildren() {
    if (this.props.children) {
      this.mountChildren();
    } else {
      this.unmountChildren();
    }
  }
  private mountChildren() {
    if (!this.props.domContainer) {
      throw Error('There is no "this.domContainer"');
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <RootContainer rt_portalID={this.props.rootId}>{this.props.children}</RootContainer>,
      this.props.domContainer,
    );
  }

  private unmountChildren() {
    if (this.props.domContainer) {
      ReactDOM.unmountComponentAtNode(this.props.domContainer);
    }
  }
}
