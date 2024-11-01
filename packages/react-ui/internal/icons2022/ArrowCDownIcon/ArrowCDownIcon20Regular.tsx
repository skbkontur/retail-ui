import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowCDownIcon20Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowCDownIcon20Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M16.78 6.845a.75.75 0 0 1 0 1.06l-4.836 4.836a2.75 2.75 0 0 1-3.889 0L3.22 7.905a.75.75 0 0 1 1.06-1.06l4.837 4.836a1.25 1.25 0 0 0 1.768 0l4.835-4.836a.75.75 0 0 1 1.061 0Z" />
      </BaseIcon>
    );
  },
);
