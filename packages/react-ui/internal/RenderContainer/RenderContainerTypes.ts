import React from 'react';

export interface PortalProps {
  rt_rootID: string;
}

export interface RenderContainerProps {
  anchor?: React.ReactNode;
  children?: React.ReactNode;
}

export interface RenderContainerState {
  isBrowser: boolean;
}
