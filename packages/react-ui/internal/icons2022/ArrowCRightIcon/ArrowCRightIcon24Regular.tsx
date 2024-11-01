import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowCRightIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowCRightIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M7.881 3.383a.875.875 0 0 1 1.238 0l6.406 6.407a3.125 3.125 0 0 1 0 4.42L9.12 20.616A.875.875 0 0 1 7.88 19.38l6.407-6.407a1.375 1.375 0 0 0 0-1.944L7.881 4.62a.875.875 0 0 1 0-1.238Z" />
      </BaseIcon>
    );
  },
);
