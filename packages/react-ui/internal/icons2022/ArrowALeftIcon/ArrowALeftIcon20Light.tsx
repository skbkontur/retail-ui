import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowALeftIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowALeftIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M8.635 15.709a.5.5 0 1 1-.707.707L2.69 11.179a2.375 2.375 0 0 1 0-3.358l5.237-5.237a.5.5 0 0 1 .707.707L3.398 8.528A1.37 1.37 0 0 0 3.09 9H17.5a.5.5 0 0 1 0 1H3.09c.066.172.17.333.308.472l5.237 5.237Z" />
      </BaseIcon>
    );
  },
);
