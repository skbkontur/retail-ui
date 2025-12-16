import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TextIcon20Solid = forwardRefAndName<SVGSVGElement, IconProps>('TextIcon20Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path d="M12.9876 2.58579C12.6125 2.21071 12.1038 2 11.5734 2H6C4.34315 2 3 3.34315 3 5V15C3 16.6569 4.34315 18 6 18H14C15.6569 18 17 16.6569 17 15V7.42664C17 6.89621 16.7893 6.3875 16.4142 6.01243L12.9876 2.58579ZM6.5 8C6.5 7.44772 6.94772 7 7.5 7H12.5C13.0523 7 13.5 7.44772 13.5 8C13.5 8.55228 13.0523 9 12.5 9H11V13.5C11 14.0523 10.5523 14.5 10 14.5C9.44772 14.5 9 14.0523 9 13.5V9H7.5C6.94772 9 6.5 8.55228 6.5 8Z" />
    </BaseIcon>
  );
});
