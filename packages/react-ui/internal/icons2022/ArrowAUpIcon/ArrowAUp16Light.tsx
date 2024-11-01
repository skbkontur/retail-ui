import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowAUpIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>('ArrowAUpIcon16Light', (props, ref) => {
  return (
    <BaseIcon ref={ref} {...props}>
      <path d="M2.854 7.27a.5.5 0 1 1-.708-.708l4.006-4.006a1.906 1.906 0 0 1 2.696 0l4.006 4.006a.5.5 0 0 1-.708.707L8.141 3.263A.91.91 0 0 0 8 3.148V13.5a.5.5 0 0 1-1 0V3.148a.91.91 0 0 0-.14.115L2.853 7.27Z" />
    </BaseIcon>
  );
});
