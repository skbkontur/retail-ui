import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowARightIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowARightIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M13.444 4.744a.875.875 0 0 1 1.237-1.238l6.284 6.284a3.125 3.125 0 0 1 0 4.42l-6.284 6.284a.875.875 0 1 1-1.237-1.238l6.284-6.284c.031-.031.06-.063.088-.097H3a.875.875 0 0 1 0-1.75h16.816a1.415 1.415 0 0 0-.088-.097l-6.284-6.284Z" />
      </BaseIcon>
    );
  },
);
