import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowCDownIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowCDownIcon16Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M13.027 5.466a.75.75 0 0 1 .007 1.06L9.24 10.37a1.75 1.75 0 0 1-2.483.008L2.97 6.59a.75.75 0 0 1 1.06-1.06L7.82 9.316a.25.25 0 0 0 .354-.002l3.793-3.842a.75.75 0 0 1 1.06-.007Z" />
      </BaseIcon>
    );
  },
);
