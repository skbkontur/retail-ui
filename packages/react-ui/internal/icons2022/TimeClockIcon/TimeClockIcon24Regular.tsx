import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName.js';
import type { IconProps } from '../BaseIcon.js';
import { BaseIcon } from '../BaseIcon.js';

export const TimeClockIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'TimeClockIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M12.5 7.3125C12.5 6.89829 12.1642 6.5625 11.75 6.5625C11.3358 6.5625 11 6.89829 11 7.3125V11.2604C11 12.1127 11.4815 12.8918 12.2438 13.2729L15.5396 14.9208C15.9101 15.1061 16.3606 14.9559 16.5458 14.5854C16.7311 14.2149 16.5809 13.7644 16.2104 13.5792L12.9146 11.9313C12.6605 11.8042 12.5 11.5445 12.5 11.2604V7.3125Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM3.75 12C3.75 7.44365 7.44365 3.75 12 3.75C16.5563 3.75 20.25 7.44365 20.25 12C20.25 16.5563 16.5563 20.25 12 20.25C7.44365 20.25 3.75 16.5563 3.75 12Z"
        />
      </BaseIcon>
    );
  },
);
