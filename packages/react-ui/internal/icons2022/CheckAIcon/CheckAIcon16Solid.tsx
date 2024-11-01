import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const CheckAIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>('CheckAIcon16Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} {...props}>
      <path d="M15.028 3.241a1.25 1.25 0 0 1 0 1.768L8.197 11.84a2.838 2.838 0 0 1-4.013 0L1.646 9.305a1.25 1.25 0 1 1 1.768-1.768l2.537 2.537a.338.338 0 0 0 .477 0l6.833-6.833a1.25 1.25 0 0 1 1.768 0Z" />
    </BaseIcon>
  );
});
