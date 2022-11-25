import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { BaseIcon, IconProps } from './BaseIcon';

export const NetUploadIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'NetUploadIcon16Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M3.998 5.56a.75.75 0 1 1-.996-1.12l3.503-3.115a2.25 2.25 0 0 1 2.99 0l3.503 3.114a.75.75 0 0 1-.996 1.122L8.75 2.67v7.579a.75.75 0 0 1-1.5 0V2.67L3.998 5.56Z" />
        <path d="M1.75 13a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11a.75.75 0 0 1-.75-.75Z" />
      </BaseIcon>
    );
  },
);
