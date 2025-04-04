import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const XIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>('XIcon24Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path d="M4.47 4.47a.75.75 0 0 1 1.06 0L12 10.94l6.47-6.47a.75.75 0 1 1 1.06 1.06L13.06 12l6.47 6.47a.75.75 0 1 1-1.06 1.06L12 13.06l-6.47 6.47a.75.75 0 0 1-1.06-1.06L10.94 12 4.47 5.53a.75.75 0 0 1 0-1.06Z" />
    </BaseIcon>
  );
});
