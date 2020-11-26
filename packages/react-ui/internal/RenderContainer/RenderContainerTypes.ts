import React from 'react';

import { Nullable } from '../../typings/utility-types';

export interface PortalProps {
  rt_rootID: string;
  container: Nullable<HTMLElement>;
}

export interface RenderContainerProps {
  anchor?: React.ReactNode;
  children?: React.ReactNode;
}
