import type React from 'react';

import type { Nullable } from '../../typings/utility-types';
import type { CommonProps } from '../CommonWrapper';

export interface PortalProps {
  rt_rootID: string;
  container: Nullable<HTMLElement>;
  children: React.ReactNode;
}

export interface RenderContainerProps extends CommonProps {
  anchor?: React.ReactNode;
  children?: React.ReactNode;
  containerRef?: React.Ref<HTMLElement>;
}
