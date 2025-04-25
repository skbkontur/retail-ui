import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const CheckAIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>('CheckAIcon20Light', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path d="M17.809 4.803a.5.5 0 0 1 0 .707l-8.54 8.54c-.97.97-2.544.97-3.514 0l-3.171-3.17a.5.5 0 0 1 .707-.708l3.171 3.171c.58.58 1.52.58 2.1 0l8.54-8.54a.5.5 0 0 1 .707 0Z" />
    </BaseIcon>
  );
});
