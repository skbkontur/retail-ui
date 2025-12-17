import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TextIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>('TextIcon16Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={16} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5967 1.58579C10.2216 1.21071 9.71293 1 9.1825 1H4.5C3.11929 1 2 2.11929 2 3.5V12.5C2 13.8807 3.11929 15 4.5 15H11.5C12.8807 15 14 13.8807 14 12.5V5.8175C14 5.28707 13.7893 4.77836 13.4142 4.40329L10.5967 1.58579ZM4.99997 6C4.99997 5.44772 5.44768 5 5.99997 5H9.99997C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 9.99997 7H8.99997V11C8.99997 11.5523 8.55225 12 7.99997 12C7.44768 12 6.99997 11.5523 6.99997 11V7H5.99997C5.44768 7 4.99997 6.55228 4.99997 6Z"
      />
    </BaseIcon>
  );
});
