import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowShapeDRadiusUpLeftIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowShapeDRadiusUpLeftIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 2.884c0-.933-1.128-1.4-1.787-.74L1.372 8.985a1.438 1.438 0 0 0 0 2.033l6.84 6.84c.66.66 1.788.193 1.788-.74V14c1.56 0 2.714.095 3.853.541 1.14.447 2.311 1.265 3.858 2.794.445.44 1.248.176 1.276-.496.151-3.658-.82-6.38-2.502-8.19C14.805 6.84 12.467 6 10 6V2.884Zm-1 0V6.5a.5.5 0 0 0 .5.5h.5c2.24 0 4.294.76 5.753 2.33 1.377 1.481 2.273 3.736 2.249 6.894-1.407-1.334-2.581-2.142-3.784-2.614C12.9 13.093 11.591 13 10 13h-.5a.5.5 0 0 0-.5.5v3.618c0 .043-.05.064-.08.034L2.079 10.31a.438.438 0 0 1 0-.619l6.84-6.841c.03-.03.08-.01.08.033Z"
        />
      </BaseIcon>
    );
  },
);
