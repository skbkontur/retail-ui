import React from 'react';

import { forwardRefAndIconName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const InfoCircleIcon64Regular = forwardRefAndIconName<SVGSVGElement, IconProps>(
  'InfoCircleIcon64Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={64} {...props}>
        <path d="M34.003 20.752a2.252 2.252 0 1 1-4.503 0 2.252 2.252 0 0 1 4.503 0Z" />
        <path d="M28.5 27a1.5 1.5 0 0 0 0 3H31v12h-4a1.5 1.5 0 0 0 0 3h11a1.5 1.5 0 0 0 0-3h-4V30a3 3 0 0 0-3-3h-2.5Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 32C6 17.64 17.64 6 32 6s26 11.64 26 26-11.64 26-26 26S6 46.36 6 32ZM32 9C19.297 9 9 19.297 9 32s10.297 23 23 23 23-10.297 23-23S44.703 9 32 9Z"
        />
      </BaseIcon>
    );
  },
);
