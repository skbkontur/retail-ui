import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const DocTextIcon24Solid = forwardRefAndName<SVGSVGElement, IconProps>('DocTextIcon24Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.05 2H8C5.79086 2 4 3.79086 4 6V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V10.05H14.8C13.2813 10.05 12.05 8.81883 12.05 7.30005V2ZM7.5 16.8C7.5 16.3858 7.83579 16.05 8.25 16.05H12.5C12.9142 16.05 13.25 16.3858 13.25 16.8C13.25 17.2143 12.9142 17.55 12.5 17.55H8.25C7.83579 17.55 7.5 17.2143 7.5 16.8ZM8.25 13.05C7.83579 13.05 7.5 13.3858 7.5 13.8C7.5 14.2143 7.83579 14.55 8.25 14.55H15.75C16.1642 14.55 16.5 14.2143 16.5 13.8C16.5 13.3858 16.1642 13.05 15.75 13.05H8.25Z"
      />
      <path d="M20 8.55005V8.50918L13.55 2.05923V7.30005C13.55 7.9904 14.1097 8.55005 14.8 8.55005H20Z" />
    </BaseIcon>
  );
});
