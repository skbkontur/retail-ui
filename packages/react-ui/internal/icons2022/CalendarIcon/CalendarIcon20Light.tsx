import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const CalendarIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>('CalendarIcon20Light', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path d="M6.125 10.5a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Z" />
      <path d="M5.5 14.125a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Z" />
      <path d="M9.125 10.5a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Z" />
      <path d="M8.5 14.125a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Z" />
      <path d="M12.125 10.5a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Z" />
      <path d="M14.5 11.125a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Z" />
      <path d="M12.125 13.5a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Z" />
      <path d="M14.5 14.125a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 2.5a.5.5 0 0 0-1 0V4H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1V2.5a.5.5 0 0 0-1 0V4H7V2.5ZM5 5a2 2 0 0 0-2 2h14a2 2 0 0 0-2-2H5Zm-2 9V8h14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
      />
    </BaseIcon>
  );
});
