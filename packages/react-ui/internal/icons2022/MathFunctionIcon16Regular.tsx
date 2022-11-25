import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { BaseIcon, IconProps } from './BaseIcon';

export const MathFunctionIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'MathFunctionIcon16Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M5.181 7v3.096a2.393 2.393 0 0 1-2.393 2.393h-.055a.75.75 0 0 0 0 1.5h.055a3.893 3.893 0 0 0 3.893-3.893V7H8.75a.75.75 0 0 0 0-1.5H6.715a2.394 2.394 0 0 1 2.36-1.989h.186a.75.75 0 0 0 0-1.5h-.187A3.893 3.893 0 0 0 5.202 5.5H3.626a.75.75 0 0 0 0 1.5h1.555Z" />
        <path d="M13.843 9.454a.75.75 0 1 0-1.06-1.06l-1.627 1.626-1.625-1.626a.75.75 0 0 0-1.061 1.06l1.626 1.626-1.626 1.626a.75.75 0 0 0 1.06 1.06l1.627-1.625 1.625 1.626a.75.75 0 0 0 1.061-1.06l-1.626-1.627 1.626-1.626Z" />
      </BaseIcon>
    );
  },
);
