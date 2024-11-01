import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const EyeOpenIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>('EyeOpenIcon20Light', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 6.376a3.624 3.624 0 1 0 0 7.248 3.624 3.624 0 0 0 0-7.248ZM7.376 10a2.624 2.624 0 1 1 5.248 0 2.624 2.624 0 0 1-5.248 0Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3.563C5.941 3.563 2.452 5.98.937 9.44a1.394 1.394 0 0 0 0 1.118c1.515 3.46 5.004 5.879 9.063 5.879 4.059 0 7.548-2.419 9.063-5.879a1.394 1.394 0 0 0 0-1.118C17.548 5.98 14.059 3.562 10 3.562ZM1.853 9.841c1.36-3.104 4.494-5.28 8.147-5.28 3.653 0 6.788 2.176 8.147 5.28.044.1.044.215 0 .316-1.36 3.104-4.493 5.28-8.147 5.28-3.653 0-6.788-2.176-8.147-5.28a.394.394 0 0 1 0-.316Z"
      />
    </BaseIcon>
  );
});
