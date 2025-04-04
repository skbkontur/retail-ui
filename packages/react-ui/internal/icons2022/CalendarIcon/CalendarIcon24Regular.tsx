import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const CalendarIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'CalendarIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M7 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M8 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        <path d="M10.35 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M11.35 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        <path d="M13.65 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M14.65 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        <path d="M17 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M18 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.75 2.5a.75.75 0 0 0-1.5 0v1.75H6A3.75 3.75 0 0 0 2.25 8v10A3.75 3.75 0 0 0 6 21.75h12A3.75 3.75 0 0 0 21.75 18V8A3.75 3.75 0 0 0 18 4.25h-1.25V2.5a.75.75 0 0 0-1.5 0v1.75h-6.5V2.5Zm11.5 6.75V8A2.25 2.25 0 0 0 18 5.75H6A2.25 2.25 0 0 0 3.75 8v1.25h16.5Zm-16.5 1.5h16.5V18A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18v-7.25Z"
        />
      </BaseIcon>
    );
  },
);
