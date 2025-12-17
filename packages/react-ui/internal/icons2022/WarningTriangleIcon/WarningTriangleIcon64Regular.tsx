import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const WarningTriangleIcon64Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'WarningTriangleIcon64Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={64} {...props}>
        <path d="M34.0001 44C34.0001 45.1046 33.1047 46 32.0001 46C30.8955 46 30.0001 45.1046 30.0001 44C30.0001 42.8955 30.8955 42 32.0001 42C33.1047 42 34.0001 42.8955 34.0001 44Z" />
        <path d="M33.5001 21.5C33.5001 20.6716 32.8285 20 32.0001 20C31.1717 20 30.5001 20.6716 30.5001 21.5V36.5C30.5001 37.3284 31.1717 38 32.0001 38C32.8285 38 33.5001 37.3284 33.5001 36.5V21.5Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.5744 9.76639C28.4895 4.92357 35.5107 4.92358 38.4258 9.76639L58.811 43.6321C61.8199 48.6309 58.2198 55 52.3853 55H11.6149C5.7804 55 2.18025 48.6309 5.1892 43.6321L25.5744 9.76639ZM35.8555 11.3135C34.1064 8.40786 29.8937 8.40785 28.1447 11.3135L7.75948 45.1793C5.9541 48.1785 8.11419 52 11.6149 52H52.3853C55.886 52 58.0461 48.1785 56.2407 45.1793L35.8555 11.3135Z"
        />
      </BaseIcon>
    );
  },
);
