import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const XIcon20Regular = forwardRefAndName<SVGSVGElement, IconProps>('XIcon20Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path d="M3.981 3.981a.75.75 0 0 1 1.061 0L10 8.94l4.958-4.958a.75.75 0 0 1 1.06 1.061L11.062 10l4.958 4.958a.75.75 0 0 1-1.06 1.06L10 11.062l-4.958 4.958a.75.75 0 1 1-1.06-1.06L8.938 10 3.981 5.042a.75.75 0 0 1 0-1.06Z" />
    </BaseIcon>
  );
});
