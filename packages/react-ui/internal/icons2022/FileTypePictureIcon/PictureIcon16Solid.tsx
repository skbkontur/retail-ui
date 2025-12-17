import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const PictureIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>('PictureIcon16Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={16} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5967 1.58579C10.2216 1.21071 9.71293 1 9.1825 1H4.5C3.11929 1 2 2.11929 2 3.5V12.5C2 13.8807 3.11929 15 4.5 15H11.5C12.8807 15 14 13.8807 14 12.5V5.8175C14 5.28707 13.7893 4.77836 13.4142 4.40329L10.5967 1.58579ZM7 5.5C7 6.32843 6.32843 7 5.5 7C4.67157 7 4 6.32843 4 5.5C4 4.67157 4.67157 4 5.5 4C6.32843 4 7 4.67157 7 5.5ZM8.59306 9.16421C8.78832 8.96895 9.10491 8.96895 9.30017 9.16421L10.7828 10.6469C11.0757 10.9398 11.5506 10.9398 11.8435 10.6469C12.1364 10.354 12.1364 9.8791 11.8435 9.58621L10.3608 8.10355C9.57978 7.3225 8.31345 7.32251 7.5324 8.10355L4.15652 11.4794C3.86363 11.7723 3.86363 12.2472 4.15652 12.5401C4.44941 12.833 4.92429 12.833 5.21718 12.5401L8.59306 9.16421Z"
      />
    </BaseIcon>
  );
});
