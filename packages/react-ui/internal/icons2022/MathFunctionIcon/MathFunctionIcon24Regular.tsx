import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const MathFunctionIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'MathFunctionIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M12.33 4.556a3.375 3.375 0 0 0-3.376 3.375V9.25h3.542a.75.75 0 0 1 0 1.5H8.954v5.319a4.875 4.875 0 0 1-4.875 4.875h-.557a.75.75 0 1 1 0-1.5h.557a3.375 3.375 0 0 0 3.375-3.375V10.75H4.693a.75.75 0 0 1 0-1.5h2.761V7.931a4.875 4.875 0 0 1 4.875-4.875h.947a.75.75 0 1 1 0 1.5h-.947Z" />
        <path d="M20.376 13.938a.75.75 0 0 0-1.06-1.06l-2.755 2.754-2.754-2.755a.75.75 0 0 0-1.06 1.06l2.754 2.755-2.755 2.754a.75.75 0 0 0 1.06 1.061l2.755-2.754 2.754 2.754a.75.75 0 0 0 1.061-1.06l-2.754-2.755 2.754-2.754Z" />
      </BaseIcon>
    );
  },
);
