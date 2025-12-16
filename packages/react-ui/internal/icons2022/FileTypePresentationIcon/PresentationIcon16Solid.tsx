import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const PresentationIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>(
  'PresentationIcon16Solid',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={16} {...props}>
        <path d="M8 5.12451C6.41198 5.12451 5.12463 6.41186 5.12463 7.99988C5.12463 9.5879 6.41198 10.8752 8 10.8752C9.58798 10.8752 10.8753 9.58797 10.8754 8L8.25 8C8.11193 8 8 7.88807 8 7.75V5.12451Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5967 1.58579C10.2216 1.21071 9.71293 1 9.1825 1H4.5C3.11929 1 2 2.11929 2 3.5V12.5C2 13.8807 3.11929 15 4.5 15H11.5C12.8807 15 14 13.8807 14 12.5V5.8175C14 5.28707 13.7893 4.77836 13.4142 4.40329L10.5967 1.58579ZM3.87463 7.99988C3.87463 5.7215 5.72162 3.87451 8 3.87451C10.2784 3.87451 12.1254 5.7215 12.1254 7.99988C12.1254 10.2783 10.2784 12.1252 8 12.1252C5.72162 12.1252 3.87463 10.2783 3.87463 7.99988Z"
        />
      </BaseIcon>
    );
  },
);
