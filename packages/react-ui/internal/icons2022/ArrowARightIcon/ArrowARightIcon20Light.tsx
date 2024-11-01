import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const ArrowARightIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'ArrowARightIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M11.365 3.291a.5.5 0 1 1 .707-.707l5.237 5.237a2.375 2.375 0 0 1 0 3.358l-5.237 5.237a.5.5 0 1 1-.707-.707l5.237-5.237c.139-.139.242-.3.309-.472H2.5a.5.5 0 1 1 0-1h14.41a1.37 1.37 0 0 0-.308-.472L11.365 3.29Z" />
      </BaseIcon>
    );
  },
);
