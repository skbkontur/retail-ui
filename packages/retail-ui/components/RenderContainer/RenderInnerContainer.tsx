import React from 'react';
import { createPortal } from 'react-dom';

import { Nullable } from '../../typings/utility-types';

import { PortalProps, RenderContainerProps } from './RenderContainerTypes';

interface RenderInnerContainerProps extends RenderContainerProps {
  domContainer: Nullable<HTMLElement>;
  rootId: string;
}

export function Portal(props: PortalProps) {
  return <noscript data-render-container-id={props.rt_rootID} />;
}

export class RenderInnerContainer extends React.Component<RenderInnerContainerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderInnerContainer';

  public render() {
    if (this.props.children) {
      if (!this.props.domContainer) {
        throw Error('There is no "this.domContainer"');
      }

      return (
        <React.Fragment>
          {this.props.anchor}
          {createPortal(this.props.children, this.props.domContainer)}
          <Portal key="portal-ref" rt_rootID={this.props.rootId} />
        </React.Fragment>
      );
    }

    return this.props.anchor;
  }
}
