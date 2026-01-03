import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const DocTextIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>('DocTextIcon16Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={16} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1H4.5C3.11929 1 2 2.11929 2 3.5V12.5C2 13.8807 3.11929 15 4.5 15H10.5C11.8807 15 13 13.8807 13 12.5V6H9.5C8.67157 6 8 5.32843 8 4.5L8 1ZM4 11.5C4 11.2239 4.22386 11 4.5 11H7.5C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12H4.5C4.22386 12 4 11.7761 4 11.5ZM4.5 9C4.22386 9 4 9.22386 4 9.5C4 9.77614 4.22386 10 4.5 10H10.5C10.7761 10 11 9.77614 11 9.5C11 9.22386 10.7761 9 10.5 9H4.5Z"
      />
      <path d="M13 5V4.98907L9.01093 1H9L9 4.5C9 4.77614 9.22386 5 9.5 5H13Z" />
    </BaseIcon>
  );
});
