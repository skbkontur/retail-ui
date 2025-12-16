import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TableIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>('TableIcon24Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 21.75C5.92893 21.75 4.25 20.0711 4.25 18V6C4.25 3.92893 5.92893 2.25 8 2.25H13.2564C13.9858 2.25 14.6853 2.53973 15.201 3.05546L18.9445 6.79902C19.4603 7.31475 19.75 8.01422 19.75 8.74357V18C19.75 20.0711 18.0711 21.75 16 21.75H8ZM8 3.75C6.75736 3.75 5.75 4.75736 5.75 6V8.25H9.25V3.75H8ZM10.75 3.75V8.25H18.1484C18.0864 8.10566 17.9971 7.97293 17.8839 7.85968L14.1403 4.11612C13.9059 3.8817 13.588 3.75 13.2564 3.75H10.75ZM9.25 9.75H5.75V18C5.75 19.2426 6.75736 20.25 8 20.25H9.25V9.75ZM10.75 20.25V9.75H18.25V18C18.25 19.2426 17.2426 20.25 16 20.25H10.75Z"
      />
    </BaseIcon>
  );
});
