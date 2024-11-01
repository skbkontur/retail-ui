import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const EyeClosedIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'EyeClosedIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M23.2 9.447a.75.75 0 0 0-1.401-.535C20.29 12.866 16.47 15.671 12 15.671s-8.29-2.805-9.799-6.759A.75.75 0 1 0 .8 9.447a12.013 12.013 0 0 0 2.067 3.492L.954 14.97a.75.75 0 0 0 1.092 1.028l1.862-1.978c1.2 1.1 2.624 1.96 4.196 2.501l-.998 2.44a.75.75 0 1 0 1.388.567l1.067-2.607c.787.163 1.603.249 2.439.249.836 0 1.652-.086 2.44-.249l1.066 2.607a.75.75 0 0 0 1.388-.568l-.998-2.439a11.974 11.974 0 0 0 4.196-2.502L21.952 16a.75.75 0 1 0 1.093-1.028l-1.912-2.033A12.011 12.011 0 0 0 23.2 9.447Z" />
      </BaseIcon>
    );
  },
);
