import React from 'react';
import ReactDOM from 'react-dom';

import { Nullable } from '../../typings/utility-types';

import { PortalProps, RenderContainerProps } from './RenderContainerTypes';

interface RenderInnerContainerProps extends RenderContainerProps {
  domContainer: Nullable<HTMLElement>;
  rootId: string;
}

export const Portal: React.FunctionComponent<PortalProps> = ({ container, rt_rootID, children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(children, container)}
      <noscript data-render-container-id={rt_rootID} />
    </React.Fragment>
  );
};

export class RenderInnerContainer extends React.Component<RenderInnerContainerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderInnerContainer';

  public render() {
    const { anchor, children, domContainer, rootId } = this.props;
    let inner = anchor;

    if (children) {
      inner = (
        <React.Fragment>
          {anchor}
          {domContainer ? (
            <Portal key="portal-ref" rt_rootID={rootId} container={domContainer}>
              {children}
            </Portal>
          ) : null}
        </React.Fragment>
      );
    }

    return inner;
  }
}
