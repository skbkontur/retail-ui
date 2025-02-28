import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const XIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>('XIcon16Light', (props, ref) => {
  return (
    <BaseIcon ref={ref} {...props}>
      <path d="M3.145 3.148a.5.5 0 0 1 .707 0l3.645 3.645 3.646-3.645a.5.5 0 1 1 .707.707L8.205 7.5l3.645 3.645a.5.5 0 1 1-.707.707L7.497 8.207l-3.645 3.645a.5.5 0 1 1-.707-.707L6.79 7.5 3.145 3.855a.5.5 0 0 1 0-.707Z" />
    </BaseIcon>
  );
});
