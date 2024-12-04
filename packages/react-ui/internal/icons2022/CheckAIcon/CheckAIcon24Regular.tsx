import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const CheckAIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>('CheckAIcon24Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path d="M21.077 5.657a.75.75 0 0 1 0 1.06l-10.249 10.25a3.131 3.131 0 0 1-4.428 0L2.595 13.16a.75.75 0 1 1 1.06-1.06l3.806 3.805c.637.637 1.67.637 2.306 0l10.25-10.249a.75.75 0 0 1 1.06 0Z" />
    </BaseIcon>
  );
});
