import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowCDownIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowCDownIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M20.617 7.881a.875.875 0 0 1 0 1.238l-6.407 6.407a3.125 3.125 0 0 1-4.42 0L3.384 9.119A.875.875 0 1 1 4.62 7.88l6.407 6.407a1.375 1.375 0 0 0 1.944 0l6.407-6.407a.875.875 0 0 1 1.238 0Z" />
      </BaseIcon>
    );
  },
);
