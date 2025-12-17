import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TextIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>('TextIcon24Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path d="M8 9C8 8.58579 8.33579 8.25 8.75 8.25H15.25C15.6642 8.25 16 8.58579 16 9C16 9.41421 15.6642 9.75 15.25 9.75H12.75V16.25C12.75 16.6642 12.4142 17 12 17C11.5858 17 11.25 16.6642 11.25 16.25V9.75H8.75C8.33579 9.75 8 9.41421 8 9Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 6C4.25 3.92893 5.92893 2.25 8 2.25H13.2564C13.9858 2.25 14.6853 2.53973 15.201 3.05546L18.9445 6.79902C19.4603 7.31475 19.75 8.01422 19.75 8.74357V18C19.75 20.0711 18.0711 21.75 16 21.75H8C5.92893 21.75 4.25 20.0711 4.25 18V6ZM8 3.75C6.75736 3.75 5.75 4.75736 5.75 6V18C5.75 19.2426 6.75736 20.25 8 20.25H16C17.2426 20.25 18.25 19.2426 18.25 18V8.74357C18.25 8.41205 18.1183 8.0941 17.8839 7.85968L14.1403 4.11612C13.9059 3.8817 13.588 3.75 13.2564 3.75H8Z"
      />
    </BaseIcon>
  );
});
