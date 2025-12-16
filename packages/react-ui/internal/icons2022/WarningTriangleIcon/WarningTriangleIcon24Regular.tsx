import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const WarningTriangleIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'WarningTriangleIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M13.125 15.9282C13.125 16.5496 12.6214 17.0533 12 17.0533C11.3787 17.0533 10.875 16.5496 10.875 15.9282C10.875 15.3069 11.3787 14.8032 12 14.8032C12.6214 14.8032 13.125 15.3069 13.125 15.9282Z" />
        <path d="M12.75 7.84538C12.75 7.43117 12.4143 7.09538 12 7.09538C11.5858 7.09538 11.25 7.43117 11.25 7.84538V12.2519C11.25 12.6661 11.5858 13.0019 12 13.0019C12.4143 13.0019 12.75 12.6661 12.75 12.2519V7.84538Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.90613 3.14886C10.8603 1.57847 13.1395 1.57847 14.0937 3.14886L22.0788 16.2906C23.0708 17.9234 21.8955 20.0128 19.985 20.0128H4.01486C2.10439 20.0128 0.929011 17.9234 1.92106 16.2906L9.90613 3.14886ZM12.8118 3.92776C12.4418 3.31884 11.558 3.31884 11.188 3.92776L3.20298 17.0695C2.81831 17.7026 3.27406 18.5128 4.01486 18.5128H19.985C20.7258 18.5128 21.1815 17.7026 20.7969 17.0695L12.8118 3.92776Z"
        />
      </BaseIcon>
    );
  },
);
