import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TableIcon20Solid = forwardRefAndName<SVGSVGElement, IconProps>('TableIcon20Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path d="M12.9876 2.58579C12.6125 2.21071 12.1038 2 11.5734 2H6C4.34315 2 3 3.34315 3 5V15C3 16.6569 4.34315 18 6 18H14C15.6569 18 17 16.6569 17 15V7.42664C17 6.89621 16.7893 6.3875 16.4142 6.01243L12.9876 2.58579ZM7 9H4V7H7V3H9V7H16V9H9V17H7V9Z" />
    </BaseIcon>
  );
});
