import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const EyeClosedIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'EyeClosedIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M19.217 7.828a.5.5 0 0 0-.934-.357c-1.276 3.342-4.504 5.713-8.283 5.713s-7.007-2.37-8.283-5.713a.5.5 0 1 0-.934.357 9.887 9.887 0 0 0 1.774 2.958L.886 12.562a.5.5 0 0 0 .728.685l1.637-1.739a9.853 9.853 0 0 0 3.668 2.185l-.882 2.155a.5.5 0 0 0 .926.379l.928-2.27a9.882 9.882 0 0 0 4.218 0l.928 2.27a.5.5 0 1 0 .926-.379l-.882-2.156a9.852 9.852 0 0 0 3.668-2.184l1.636 1.739a.5.5 0 0 0 .728-.685l-1.67-1.776a9.887 9.887 0 0 0 1.774-2.958Z" />
      </BaseIcon>
    );
  },
);
