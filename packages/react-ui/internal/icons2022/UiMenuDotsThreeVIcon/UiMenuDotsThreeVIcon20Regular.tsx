import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const UiMenuDotsThreeVIcon20Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'UiMenuDotsThreeVIcon20Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M11.56 3.76a1.56 1.56 0 1 1-3.12 0 1.56 1.56 0 0 1 3.12 0Z" />
        <path d="M11.56 10a1.56 1.56 0 1 1-3.12 0 1.56 1.56 0 0 1 3.12 0Z" />
        <path d="M10 17.8a1.56 1.56 0 1 0 0-3.12 1.56 1.56 0 0 0 0 3.12Z" />
      </BaseIcon>
    );
  },
);
