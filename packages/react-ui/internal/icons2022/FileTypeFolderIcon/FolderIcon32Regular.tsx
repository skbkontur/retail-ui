import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const FolderIcon32Regular = forwardRefAndName<SVGSVGElement, IconProps>('FolderIcon32Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={32} {...props}>
      <path d="M7.5 12C6.94772 12 6.5 12.4477 6.5 13C6.5 13.5523 6.94772 14 7.5 14H24.5C25.0523 14 25.5 13.5523 25.5 13C25.5 12.4477 25.0523 12 24.5 12H7.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 3C3.567 3 2 4.567 2 6.5V23.5C2 26.5376 4.46243 29 7.5 29H24.5C27.5376 29 30 26.5376 30 23.5V12.5C30 9.46243 27.5376 7 24.5 7H17.25C16.7779 7 16.3333 6.77771 16.05 6.4L14.55 4.4C13.889 3.51868 12.8517 3 11.75 3H5.5ZM4 6.5C4 5.67157 4.67157 5 5.5 5H11.75C12.2221 5 12.6667 5.22229 12.95 5.6L14.45 7.6C15.111 8.48132 16.1483 9 17.25 9H24.5C26.433 9 28 10.567 28 12.5V23.5C28 25.433 26.433 27 24.5 27H7.5C5.567 27 4 25.433 4 23.5V6.5Z"
      />
    </BaseIcon>
  );
});
