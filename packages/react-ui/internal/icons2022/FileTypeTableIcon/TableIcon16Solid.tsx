import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TableIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>('TableIcon16Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={16} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5967 1.58579C10.2216 1.21071 9.71293 1 9.1825 1H4.5C3.11929 1 2 2.11929 2 3.5V12.5C2 13.8807 3.11929 15 4.5 15H11.5C12.8807 15 14 13.8807 14 12.5V5.8175C14 5.28707 13.7893 4.77836 13.4142 4.40329L10.5967 1.58579ZM5.1 6.9H3V5.1H5.1V2H6.9V5.1H13V6.9H6.9V14H5.1V6.9Z"
      />
    </BaseIcon>
  );
});
