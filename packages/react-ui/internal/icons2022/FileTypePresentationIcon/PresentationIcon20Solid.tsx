import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const PresentationIcon20Solid = forwardRefAndName<SVGSVGElement, IconProps>(
  'PresentationIcon20Solid',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M10 6.24548C7.92637 6.24548 6.24536 7.92649 6.24536 10.0001C6.24536 12.0738 7.92637 13.7548 10 13.7548C12.0736 13.7548 13.7546 12.0738 13.7546 10.0001C13.7546 10.0001 13.7546 10.0002 13.7546 10.0001L10.25 10C10.1119 10 10 9.88807 10 9.75V6.24548Z" />
        <path d="M12.9876 2.58579C12.6125 2.21071 12.1038 2 11.5734 2H6C4.34315 2 3 3.34315 3 5V15C3 16.6569 4.34315 18 6 18H14C15.6569 18 17 16.6569 17 15V7.42664C17 6.89621 16.7893 6.3875 16.4142 6.01243L12.9876 2.58579ZM4.99536 10.0001C4.99536 7.23614 7.23601 4.99548 10 4.99548C12.764 4.99548 15.0046 7.23614 15.0046 10.0001C15.0046 12.7641 12.764 15.0048 10 15.0048C7.23601 15.0048 4.99536 12.7641 4.99536 10.0001Z" />
      </BaseIcon>
    );
  },
);
