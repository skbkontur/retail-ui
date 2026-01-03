import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const FolderIcon20Solid = forwardRefAndName<SVGSVGElement, IconProps>('FolderIcon20Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path d="M2 4.5C2 3.67157 2.67157 3 3.5 3H7.79997C8.27525 3 8.7224 3.22524 9.0053 3.60716L9.81216 4.69642C9.95361 4.88738 10.1772 5 10.4148 5H15C16.6569 5 18 6.34315 18 8V14C18 15.6569 16.6569 17 15 17H5C3.34315 17 2 15.6569 2 14V4.5ZM5 8C4.58579 8 4.25 8.33579 4.25 8.75C4.25 9.16421 4.58579 9.5 5 9.5H15C15.4142 9.5 15.75 9.16421 15.75 8.75C15.75 8.33579 15.4142 8 15 8H5Z" />
    </BaseIcon>
  );
});
