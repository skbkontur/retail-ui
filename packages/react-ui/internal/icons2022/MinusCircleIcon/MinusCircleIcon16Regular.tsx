import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const MinusCircleIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'MinusCircleIcon16Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M5 7.25a.75.75 0 1 0 0 1.5h6a.75.75 0 0 0 0-1.5H5Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM2.5 8a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"
        />
      </BaseIcon>
    );
  },
);
