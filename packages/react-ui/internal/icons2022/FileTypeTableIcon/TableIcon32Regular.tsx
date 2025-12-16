import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TableIcon32Regular = forwardRefAndName<SVGSVGElement, IconProps>('TableIcon32Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={32} {...props}>
      <path d="M7 12C7 11.4477 7.44772 11 8 11H12V7C12 6.44772 12.4477 6 13 6C13.5523 6 14 6.44772 14 7V11H23C23.5523 11 24 11.4477 24 12C24 12.5523 23.5523 13 23 13H14V25C14 25.5523 13.5523 26 13 26C12.4477 26 12 25.5523 12 25V13H8C7.44772 13 7 12.5523 7 12Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 7.5C4 4.46243 6.46243 2 9.5 2H18.2261C19.287 2 20.3044 2.42143 21.0546 3.17157L26.8284 8.94543C27.5786 9.69558 28 10.713 28 11.7739V24.5C28 27.5376 25.5376 30 22.5 30H9.5C6.46243 30 4 27.5376 4 24.5V7.5ZM9.5 4C7.567 4 6 5.567 6 7.5V24.5C6 26.433 7.567 28 9.5 28H22.5C24.433 28 26 26.433 26 24.5V11.7739C26 11.2434 25.7893 10.7347 25.4142 10.3596L19.6404 4.58579C19.2653 4.21071 18.7566 4 18.2261 4H9.5Z"
      />
    </BaseIcon>
  );
});
