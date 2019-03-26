import React from 'react';
import ReactDOM from 'react-dom';
import { Nullable } from '../../typings/utility-types';
import { PortalProps, RenderContainerProps } from './RenderContainerTypes';

interface RenderContainerNativeProps extends RenderContainerProps {
  domContainer: Nullable<HTMLElement>;
  rootId: number;
}

export function Portal(props: PortalProps) {
  return <noscript data-render-container-id={props.rt_rootID} />;
}

export class RenderInnerContainer extends React.Component<RenderContainerNativeProps> {
  public render() {
    if (this.props.children) {
      if (!this.props.domContainer) {
        throw Error('There is no "this.domContainer"');
      }

      return (
        <React.Fragment>
          {this.props.anchor}
          {ReactDOM.createPortal(this.props.children, this.props.domContainer)}
          <Portal key="portal-ref" rt_rootID={this.props.rootId} />
        </React.Fragment>
      );
    }

    return this.props.anchor;
  }
}
