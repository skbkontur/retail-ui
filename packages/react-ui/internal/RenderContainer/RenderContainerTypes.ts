import React from 'react';

export interface PortalProps {
  rt_rootID: string;
  container: HTMLElement;
}

export interface RenderContainerProps {
  anchor?: React.ReactNode;
  children?: React.ReactNode;
}
