import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const MathFunctionIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'MathFunctionIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M8.643 3A2.643 2.643 0 0 0 6 5.643V6h2.5a.5.5 0 0 1 0 1H6v3.357A3.643 3.643 0 0 1 2.357 14H2a.5.5 0 0 1 0-1h.357A2.643 2.643 0 0 0 5 10.357V7H3a.5.5 0 0 1 0-1h2v-.357A3.643 3.643 0 0 1 8.643 2H9.5a.5.5 0 0 1 0 1h-.857Z" />
        <path d="M8.604 8.677a.5.5 0 0 0-.707.707l1.88 1.881-1.88 1.881a.5.5 0 0 0 .707.707l1.88-1.88 1.882 1.88a.5.5 0 0 0 .707-.707l-1.881-1.88 1.88-1.881a.5.5 0 1 0-.706-.708l-1.881 1.881-1.881-1.88Z" />
      </BaseIcon>
    );
  },
);
