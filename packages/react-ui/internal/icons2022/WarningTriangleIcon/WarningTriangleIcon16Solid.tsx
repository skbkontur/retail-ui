import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const WarningTriangleIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>(
  'WarningTriangleIcon16Solid',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={16} {...props}>
        <path
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.9061 1.17999C6.86028 -0.390398 9.13951 -0.390401 10.0937 1.17999L15.6327 10.2778C16.6247 11.9105 15.4494 14 13.5389 14H2.46091C0.550429 14 -0.624943 11.9105 0.367109 10.2778L5.9061 1.17999ZM9.12717 10.9999C9.12717 11.6225 8.62248 12.1272 7.9999 12.1272C7.37733 12.1272 6.87263 11.6225 6.87263 10.9999C6.87263 10.3773 7.37733 9.87263 7.9999 9.87263C8.62248 9.87263 9.12717 10.3773 9.12717 10.9999ZM8.9999 4.49992C8.9999 3.94764 8.55218 3.49992 7.9999 3.49992C7.44761 3.49992 6.9999 3.94764 6.9999 4.49992V7.74992C6.9999 8.30221 7.44761 8.74992 7.9999 8.74992C8.55218 8.74992 8.9999 8.30221 8.9999 7.74992V4.49992Z"
        />
      </BaseIcon>
    );
  },
);
