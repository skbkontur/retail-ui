import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowCollapseCVOpenIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowCollapseCVOpenIcon16Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M9.379 2.568a1.95 1.95 0 0 0-2.758 0L3.97 5.22a.75.75 0 0 0 1.06 1.06L7.682 3.63a.45.45 0 0 1 .636 0L10.97 6.28a.75.75 0 0 0 1.06-1.06L9.38 2.568Z" />
        <path d="M9.379 13.432a1.95 1.95 0 0 1-2.758 0L3.97 10.78a.75.75 0 0 1 1.06-1.06l2.652 2.651a.45.45 0 0 0 .636 0L10.97 9.72a.75.75 0 0 1 1.06 1.06L9.38 13.432Z" />
      </BaseIcon>
    );
  },
);
