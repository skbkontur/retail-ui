import * as React from 'react';

export interface PortalProps {
  rt_rootID: number;
}

export interface RenderContainerProps {
  anchor?: React.ReactNode;
  children?: React.ReactNode;
}
