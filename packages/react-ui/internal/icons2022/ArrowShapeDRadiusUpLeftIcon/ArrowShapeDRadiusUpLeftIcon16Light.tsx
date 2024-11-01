import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowShapeDRadiusUpLeftIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowShapeDRadiusUpLeftIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.002 2.557c0-.836-1.01-1.254-1.6-.663L1.178 7.116a1.25 1.25 0 0 0 0 1.768l5.222 5.223c.59.59 1.6.172 1.6-.663v-2.441c1.028.012 1.86.078 2.695.383.957.35 1.963 1.034 3.24 2.425a.6.6 0 0 0 1.043-.373c.165-3.018-.654-5.153-2.094-6.529-1.31-1.25-3.068-1.812-4.883-1.897V2.557Zm-1 .15V5.5a.5.5 0 0 0 .5.5c1.822 0 3.506.499 4.692 1.632 1.039.992 1.756 2.527 1.803 4.805-1.057-1.029-1.999-1.64-2.958-1.99C9.89 10.027 8.762 10 7.502 10a.5.5 0 0 0-.5.5v2.793L1.886 8.177a.25.25 0 0 1 0-.353l5.116-5.117Z"
        />
      </BaseIcon>
    );
  },
);
