import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ShapeSquareIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>(
  'ShapeSquareIcon16Solid',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M1 4.5A3.5 3.5 0 0 1 4.5 1h7A3.5 3.5 0 0 1 15 4.5v7a3.5 3.5 0 0 1-3.5 3.5h-7A3.5 3.5 0 0 1 1 11.5v-7Z" />
      </BaseIcon>
    );
  },
);
