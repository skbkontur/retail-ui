import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const FolderIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>('FolderIcon16Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={16} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 3.5C1 2.67157 1.67157 2 2.5 2H5.79997C6.27525 2 6.7224 2.22524 7.0053 2.60716L8.03704 4H12.5C13.8807 4 15 5.11929 15 6.5V11.5C15 12.8807 13.8807 14 12.5 14H3.5C2.11929 14 1 12.8807 1 11.5V3.5ZM3.5 7C3.22386 7 3 7.22386 3 7.5C3 7.77614 3.22386 8 3.5 8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H3.5Z"
      />
    </BaseIcon>
  );
});
