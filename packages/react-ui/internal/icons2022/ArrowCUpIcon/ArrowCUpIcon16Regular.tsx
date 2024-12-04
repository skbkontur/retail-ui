import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowCUpIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowCUpIcon16Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M2.973 10.534a.75.75 0 0 1-.007-1.06L6.76 5.63a1.75 1.75 0 0 1 2.483-.008L13.03 9.41a.75.75 0 0 1-1.06 1.06L8.18 6.684a.25.25 0 0 0-.354.002l-3.793 3.842a.75.75 0 0 1-1.06.007Z" />
      </BaseIcon>
    );
  },
);
