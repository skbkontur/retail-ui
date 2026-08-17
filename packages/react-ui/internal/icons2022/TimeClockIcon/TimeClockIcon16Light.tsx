import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName.js';
import type { IconProps } from '../BaseIcon.js';
import { BaseIcon } from '../BaseIcon.js';

export const TimeClockIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'TimeClockIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M8 4.40234C8 4.1262 7.77614 3.90234 7.5 3.90234C7.22386 3.90234 7 4.1262 7 4.40234V6.7274C7 7.39025 7.3745 7.99621 7.96738 8.29265L10.2764 9.44716C10.5234 9.57065 10.8237 9.47054 10.9472 9.22355C11.0707 8.97656 10.9706 8.67623 10.7236 8.55273L8.41459 7.39822C8.1605 7.27118 8 7.01148 8 6.7274V4.40234Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1ZM2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5Z"
        />
      </BaseIcon>
    );
  },
);
