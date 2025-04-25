import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowCRightIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowCRightIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M7.021 3.396a.5.5 0 0 1 .708 0l4.836 4.836a2.5 2.5 0 0 1 0 3.536l-4.836 4.836a.5.5 0 1 1-.708-.707l4.836-4.836a1.5 1.5 0 0 0 0-2.122L7.021 4.104a.5.5 0 0 1 0-.708Z" />
      </BaseIcon>
    );
  },
);
