import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const UiMenuDotsThreeVIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'UiMenuDotsThreeVIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M13.878 4.5a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Z" />
        <path d="M13.877 12.003a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Z" />
        <path d="M12.002 21.38a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
      </BaseIcon>
    );
  },
);
