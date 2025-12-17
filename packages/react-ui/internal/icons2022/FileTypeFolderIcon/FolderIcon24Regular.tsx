import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const FolderIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>('FolderIcon24Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path d="M6 9.25C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H18C18.4142 10.75 18.75 10.4142 18.75 10C18.75 9.58579 18.4142 9.25 18 9.25H6Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.875 3.25C3.42525 3.25 2.25 4.42525 2.25 5.875V17C2.25 19.0711 3.92893 20.75 6 20.75H18C20.0711 20.75 21.75 19.0711 21.75 17V9C21.75 6.92893 20.0711 5.25 18 5.25H11.6246L11.1893 4.52445C10.7149 3.73378 9.86046 3.25 8.93839 3.25H4.875ZM3.75 5.875C3.75 5.25368 4.25368 4.75 4.875 4.75H8.93839C9.33356 4.75 9.69976 4.95734 9.90307 5.29619L10.3384 6.02174C10.6095 6.47355 11.0977 6.75 11.6246 6.75H18C19.2426 6.75 20.25 7.75736 20.25 9V17C20.25 18.2426 19.2426 19.25 18 19.25H6C4.75736 19.25 3.75 18.2426 3.75 17V5.875Z"
      />
    </BaseIcon>
  );
});
