import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { CommonProps } from '../CommonWrapper';

export interface PortalProps {
  rt_rootID: string;
  container: Nullable<HTMLElement>;
  children: React.ReactNode;
}

export interface RenderContainerProps extends CommonProps {
  anchor?: React.ReactNode;
  children?: React.ReactNode;
}
