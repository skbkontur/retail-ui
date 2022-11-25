import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { BaseIcon, IconProps } from './BaseIcon';

export const EyeClosedIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'EyeClosedIcon16Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M15.7 6.387a.75.75 0 1 0-1.401-.535A6.745 6.745 0 0 1 8 10.197a6.745 6.745 0 0 1-6.299-4.345.75.75 0 1 0-1.401.535c.31.812.743 1.562 1.278 2.228L.454 9.809a.75.75 0 1 0 1.092 1.029l1.075-1.142a8.235 8.235 0 0 0 2.451 1.465l-.566 1.385a.75.75 0 1 0 1.388.568l.634-1.548a8.278 8.278 0 0 0 2.944 0l.634 1.548a.75.75 0 0 0 1.388-.568l-.566-1.385a8.234 8.234 0 0 0 2.451-1.466l1.074 1.142a.75.75 0 0 0 1.093-1.027l-1.124-1.195A8.257 8.257 0 0 0 15.7 6.387Z" />
      </BaseIcon>
    );
  },
);
