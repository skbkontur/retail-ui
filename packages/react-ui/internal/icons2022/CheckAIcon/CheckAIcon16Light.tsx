import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const CheckAIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>('CheckAIcon16Light', (props, ref) => {
  return (
    <BaseIcon ref={ref} {...props}>
      <path d="M13.718 3.771a.5.5 0 0 1 0 .708L6.885 11.31a2.088 2.088 0 0 1-2.952 0L1.396 8.774a.5.5 0 1 1 .708-.707l2.536 2.537a1.087 1.087 0 0 0 1.538 0l6.833-6.833a.5.5 0 0 1 .707 0Z" />
    </BaseIcon>
  );
});
