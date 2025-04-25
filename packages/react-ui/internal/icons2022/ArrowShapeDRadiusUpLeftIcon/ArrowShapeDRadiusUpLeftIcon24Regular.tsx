import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowShapeDRadiusUpLeftIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowShapeDRadiusUpLeftIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.999 3.448c0-1.202-1.454-1.805-2.305-.954l-8.178 8.18a1.875 1.875 0 0 0 0 2.65l8.178 8.18c.85.85 2.305.248 2.305-.955V17c1.8 0 3.18.008 4.564.454 1.37.441 2.807 1.336 4.608 3.24.604.638 1.777.306 1.814-.673.168-4.415-1.09-7.691-3.219-9.865-2.064-2.108-4.872-3.1-7.767-3.153V3.448Zm-1.5.363V7.75c0 .414.336.75.75.75h.505c2.657 0 5.151.878 6.94 2.704 1.623 1.657 2.733 4.162 2.803 7.686-1.599-1.535-3.023-2.398-4.474-2.865-1.637-.527-3.247-.526-4.998-.525h-.776a.75.75 0 0 0-.75.75v3.937l-7.922-7.923a.375.375 0 0 1 0-.53l7.922-7.923Z"
        />
      </BaseIcon>
    );
  },
);
