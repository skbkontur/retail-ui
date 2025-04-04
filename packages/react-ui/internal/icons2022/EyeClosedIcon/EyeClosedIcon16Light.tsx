import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const EyeClosedIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'EyeClosedIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M15.467 6.298a.5.5 0 1 0-.934-.356A6.995 6.995 0 0 1 8 10.447a6.995 6.995 0 0 1-6.533-4.505.5.5 0 1 0-.934.356 8.009 8.009 0 0 0 1.378 2.328L.636 9.98a.5.5 0 1 0 .728.685l1.242-1.319a7.983 7.983 0 0 0 2.796 1.668l-.665 1.626a.5.5 0 0 0 .926.379l.71-1.739a8.007 8.007 0 0 0 3.253 0l.711 1.739a.5.5 0 0 0 .926-.38l-.665-1.625a7.982 7.982 0 0 0 2.797-1.668l1.24 1.319a.5.5 0 1 0 .729-.685l-1.275-1.356a8.009 8.009 0 0 0 1.378-2.327Z" />
      </BaseIcon>
    );
  },
);
