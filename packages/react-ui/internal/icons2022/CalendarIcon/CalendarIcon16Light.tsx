import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const CalendarIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>('CalendarIcon16Light', (props, ref) => {
  return (
    <BaseIcon ref={ref} {...props}>
      <path d="M5.078 8.5a.578.578 0 1 1-1.156 0 .578.578 0 0 1 1.156 0Z" />
      <path d="M4.5 11.078a.578.578 0 1 0 0-1.156.578.578 0 0 0 0 1.156Z" />
      <path d="M7.078 8.5a.578.578 0 1 1-1.156 0 .578.578 0 0 1 1.156 0Z" />
      <path d="M6.5 11.078a.578.578 0 1 0 0-1.156.578.578 0 0 0 0 1.156Z" />
      <path d="M9.078 8.5a.578.578 0 1 1-1.156 0 .578.578 0 0 1 1.156 0Z" />
      <path d="M10.5 9.078a.578.578 0 1 0 0-1.156.578.578 0 0 0 0 1.156Z" />
      <path d="M9.078 10.5a.578.578 0 1 1-1.156 0 .578.578 0 0 1 1.156 0Z" />
      <path d="M10.5 11.078a.578.578 0 1 0 0-1.156.578.578 0 0 0 0 1.156Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 1a.5.5 0 0 1 .5.5V3h5V1.5a.5.5 0 0 1 1 0V3h.5A2.5 2.5 0 0 1 14 5.5v6a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 1 11.5v-6A2.5 2.5 0 0 1 3.5 3H4V1.5a.5.5 0 0 1 .5-.5Zm-1 3a1.5 1.5 0 0 0-1.415 1h10.83A1.5 1.5 0 0 0 11.5 4h-8ZM2 6h11v5.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 11.5V6Z"
      />
    </BaseIcon>
  );
});
