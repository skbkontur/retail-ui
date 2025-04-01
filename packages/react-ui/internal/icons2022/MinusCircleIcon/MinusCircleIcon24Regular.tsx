import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const MinusCircleIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'MinusCircleIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M7.5 11.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Z"
        />
      </BaseIcon>
    );
  },
);
