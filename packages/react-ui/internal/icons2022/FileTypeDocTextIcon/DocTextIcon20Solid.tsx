import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const DocTextIcon20Solid = forwardRefAndName<SVGSVGElement, IconProps>('DocTextIcon20Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0044 2H7C5.34315 2 4 3.34315 4 5V15C4 16.6569 5.34315 18 7 18H13C14.6569 18 16 16.6569 16 15V7.9978H12.2544C11.0118 7.9978 10.0044 6.99044 10.0044 5.7478V2ZM6.25 14.25C6.25 13.8358 6.58579 13.5 7 13.5H9.75C10.1642 13.5 10.5 13.8358 10.5 14.25C10.5 14.6642 10.1642 15 9.75 15H7C6.58579 15 6.25 14.6642 6.25 14.25ZM7 10.5C6.58579 10.5 6.25 10.8358 6.25 11.25C6.25 11.6642 6.58579 12 7 12H13C13.4142 12 13.75 11.6642 13.75 11.25C13.75 10.8358 13.4142 10.5 13 10.5H7Z"
      />
      <path d="M15.8632 6.4978L11.5044 2.13899V5.7478C11.5044 6.16202 11.8402 6.4978 12.2544 6.4978H15.8632Z" />
    </BaseIcon>
  );
});
