import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const UiMenuDots3HIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'UiMenuDots3HIcon16Regular',
  (props, ref) => (
    <BaseIcon ref={ref} viewBoxSize={16} {...props}>
      <path d="M1.75 8a1.248 1.248 0 1 0 2.497 0A1.248 1.248 0 0 0 1.75 8Z" />
      <path d="M8 9.248a1.248 1.248 0 1 1 0-2.496 1.248 1.248 0 0 1 0 2.496Z" />
      <path d="M13.002 9.248a1.248 1.248 0 1 1 0-2.496 1.248 1.248 0 0 1 0 2.496Z" />
    </BaseIcon>
  ),
);
