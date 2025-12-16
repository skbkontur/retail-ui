import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TableIcon24Solid = forwardRefAndName<SVGSVGElement, IconProps>('TableIcon24Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path d="M15.2013 2.87868C14.6387 2.31607 13.8756 2 13.08 2H8C5.79086 2 4 3.79086 4 6V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V8.92003C20 8.12439 19.6839 7.36132 19.1213 6.79871L15.2013 2.87868ZM6 9C6 8.44772 6.44772 8 7 8H9V5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V8H17C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10H11V19C11 19.5523 10.5523 20 10 20C9.44772 20 9 19.5523 9 19V10H7C6.44772 10 6 9.55228 6 9Z" />
    </BaseIcon>
  );
});
