import React from 'react';
import ReactDOM from 'react-dom';

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
    const { anchor, children, domContainer, rootId } = this.props;
    let inner = anchor;

    if (children) {
      inner = (
        <React.Fragment>
          {anchor}
          {domContainer && ReactDOM.createPortal(children, domContainer)}
          <Portal key="portal-ref" rt_rootID={rootId} />
        </React.Fragment>
      );
    }

    return inner;
  }
}
