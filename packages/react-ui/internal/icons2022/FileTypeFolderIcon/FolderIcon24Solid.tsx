import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const FolderIcon24Solid = forwardRefAndName<SVGSVGElement, IconProps>('FolderIcon24Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path d="M2 5C2 3.89543 2.89543 3 4 3H8.86762C9.57015 3 10.2212 3.3686 10.5826 3.97101L10.9815 4.63587C11.1171 4.86178 11.3612 5 11.6246 5H18C20.2091 5 22 6.79086 22 9V17C22 19.2091 20.2091 21 18 21H6C3.79086 21 2 19.2091 2 17V5ZM5.5 9C5.08579 9 4.75 9.33579 4.75 9.75C4.75 10.1642 5.08579 10.5 5.5 10.5H18.5C18.9142 10.5 19.25 10.1642 19.25 9.75C19.25 9.33579 18.9142 9 18.5 9H5.5Z" />
    </BaseIcon>
  );
});
