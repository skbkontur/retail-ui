import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const MinusCircleIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'MinusCircleIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M6 9a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1H6Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 2a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM3 9.5a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Z"
        />
      </BaseIcon>
    );
  },
);
