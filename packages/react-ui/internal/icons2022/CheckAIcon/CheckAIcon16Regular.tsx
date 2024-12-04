import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const CheckAIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>('CheckAIcon16Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} {...props}>
      <path d="M14.895 3.595a.75.75 0 0 1 0 1.06l-6.833 6.833a2.337 2.337 0 0 1-3.306 0L2.22 8.95a.75.75 0 0 1 1.06-1.06l2.537 2.536a.838.838 0 0 0 1.185 0l6.832-6.832a.75.75 0 0 1 1.06 0Z" />
    </BaseIcon>
  );
});
