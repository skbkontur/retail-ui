import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowALeftIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowALeftIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M7.27 12.146a.5.5 0 1 1-.708.707L2.556 8.849a1.906 1.906 0 0 1 0-2.696l4.006-4.006a.5.5 0 1 1 .707.707L3.263 6.86a.91.91 0 0 0-.115.14H13.5a.5.5 0 0 1 0 1H3.148a.91.91 0 0 0 .115.142l4.006 4.005Z" />
      </BaseIcon>
    );
  },
);
