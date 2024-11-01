import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const SearchLoupeIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'SearchLoupeIcon16Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.853 11.914a6.25 6.25 0 1 1 1.06-1.06l2.854 2.853a.75.75 0 1 1-1.06 1.06l-2.854-2.853ZM2.246 6.996a4.75 4.75 0 1 1 8.153 3.313.784.784 0 0 0-.09.09 4.75 4.75 0 0 1-8.064-3.403Z"
        />
      </BaseIcon>
    );
  },
);
