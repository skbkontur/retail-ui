import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const MinusCircleIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'MinusCircleIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M4.426 7a.5.5 0 1 0 0 1h6.148a.5.5 0 0 0 0-1H4.426Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 1a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM2 7.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"
        />
      </BaseIcon>
    );
  },
);
