import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const NetUploadIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'NetUploadIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M5.748 8.06a.75.75 0 1 1-.996-1.12l5.255-4.672a3 3 0 0 1 3.986 0l5.255 4.671a.75.75 0 0 1-.996 1.122l-5.255-4.672a1.505 1.505 0 0 0-.247-.178V16.5a.75.75 0 0 1-1.5 0V3.211c-.086.05-.17.11-.246.178L5.748 8.061Z" />
        <path d="M2.75 21a.75.75 0 0 1 .75-.75h17a.75.75 0 0 1 0 1.5h-17a.75.75 0 0 1-.75-.75Z" />
      </BaseIcon>
    );
  },
);
