import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowARightIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowARightIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M8.73 2.854a.5.5 0 1 1 .708-.708l4.006 4.006a1.906 1.906 0 0 1 0 2.696l-4.006 4.006a.5.5 0 0 1-.707-.708l4.005-4.005A.914.914 0 0 0 12.852 8H2.5a.5.5 0 0 1 0-1h10.352a.914.914 0 0 0-.116-.14L8.732 2.853Z" />
      </BaseIcon>
    );
  },
);
