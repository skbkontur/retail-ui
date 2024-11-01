import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowCRightIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowCRightIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M5.644 3.149a.5.5 0 0 1 .707-.005l3.843 3.793a1.5 1.5 0 0 1 .006 2.128l-3.788 3.789a.5.5 0 0 1-.707-.708l3.788-3.788a.5.5 0 0 0-.002-.71L5.649 3.857a.5.5 0 0 1-.005-.707Z" />
      </BaseIcon>
    );
  },
);
