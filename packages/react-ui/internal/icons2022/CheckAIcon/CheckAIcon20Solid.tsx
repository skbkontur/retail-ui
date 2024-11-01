import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const CheckAIcon20Solid = forwardRefAndName<SVGSVGElement, IconProps>('CheckAIcon20Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path d="M18.34 4.272a1.25 1.25 0 0 1 0 1.768l-8.541 8.54a3.234 3.234 0 0 1-4.574 0l-3.171-3.17A1.25 1.25 0 0 1 3.82 9.642l3.171 3.171a.734.734 0 0 0 1.039 0l8.54-8.54a1.25 1.25 0 0 1 1.768 0Z" />
    </BaseIcon>
  );
});
