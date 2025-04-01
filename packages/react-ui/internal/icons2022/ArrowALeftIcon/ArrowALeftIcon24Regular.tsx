import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowALeftIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowALeftIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M10.556 19.256a.875.875 0 1 1-1.237 1.238L3.035 14.21a3.125 3.125 0 0 1 0-4.42l6.284-6.284a.875.875 0 0 1 1.237 1.238l-6.284 6.284c-.031.031-.06.064-.088.097H21a.875.875 0 1 1 0 1.75H4.184c.028.034.057.066.088.097l6.284 6.284Z" />
      </BaseIcon>
    );
  },
);
