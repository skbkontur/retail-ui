import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TextIcon24Solid = forwardRefAndName<SVGSVGElement, IconProps>('TextIcon24Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path d="M15.2013 2.87868C14.6387 2.31607 13.8756 2 13.08 2H8C5.79086 2 4 3.79086 4 6V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V8.92003C20 8.12439 19.6839 7.36132 19.1213 6.79871L15.2013 2.87868ZM8 9C8 8.44772 8.44772 8 9 8H15C15.5523 8 16 8.44772 16 9C16 9.55228 15.5523 10 15 10H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V10H9C8.44772 10 8 9.55228 8 9Z" />
    </BaseIcon>
  );
});
