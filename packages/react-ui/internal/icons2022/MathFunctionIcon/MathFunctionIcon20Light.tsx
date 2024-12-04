import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const MathFunctionIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'MathFunctionIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M9.942 3a2.938 2.938 0 0 0-2.937 2.938v2.055h3.16a.5.5 0 1 1 0 1h-3.16v5.048a3.937 3.937 0 0 1-3.938 3.937h-.556a.5.5 0 1 1 0-1h.556a2.937 2.937 0 0 0 2.938-2.937V8.993H3.509a.5.5 0 1 1 0-1h2.496V5.937A3.938 3.938 0 0 1 9.942 2h.89a.5.5 0 1 1 0 1h-.89Z" />
        <path d="M16.788 11.543a.5.5 0 1 0-.707-.707l-2.448 2.448-2.448-2.448a.5.5 0 1 0-.707.707l2.448 2.448-2.448 2.448a.5.5 0 1 0 .707.707l2.448-2.448 2.448 2.448a.5.5 0 1 0 .707-.707l-2.448-2.448 2.448-2.448Z" />
      </BaseIcon>
    );
  },
);
