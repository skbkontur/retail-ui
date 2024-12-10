import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const UiMenuDotsThreeVIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'UiMenuDotsThreeVIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M9 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        <path d="M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        <path d="M8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      </BaseIcon>
    );
  },
);
