import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName.js';
import type { IconProps } from '../BaseIcon.js';
import { BaseIcon } from '../BaseIcon.js';

export const TimeClockIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'TimeClockIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M10.0033 6.50463C10.0033 6.22849 9.77943 6.00464 9.50329 6.00464C9.22715 6.00464 9.00329 6.2285 9.0033 6.50464L9.00332 9.47699C9.00332 10.1394 9.3774 10.7451 9.96974 11.0417L12.7761 12.4471C13.023 12.5707 13.3234 12.4708 13.4471 12.2239C13.5707 11.977 13.4708 11.6766 13.2239 11.5529L10.4175 10.1476C10.1636 10.0205 10.0033 9.76089 10.0033 9.47698L10.0033 6.50463Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z"
        />
      </BaseIcon>
    );
  },
);
