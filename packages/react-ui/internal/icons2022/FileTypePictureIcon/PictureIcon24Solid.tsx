import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const PictureIcon24Solid = forwardRefAndName<SVGSVGElement, IconProps>('PictureIcon24Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2013 2.87868C14.6387 2.31607 13.8756 2 13.08 2H8C5.79086 2 4 3.79086 4 6V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V8.92003C20 8.12439 19.6839 7.36132 19.1213 6.79871L15.2013 2.87868ZM11 8C11 9.10457 10.1046 10 9 10C7.89543 10 7 9.10457 7 8C7 6.89543 7.89543 6 9 6C10.1046 6 11 6.89543 11 8ZM12.8367 13.2657C13.1784 12.924 13.7324 12.924 14.0742 13.2657L15.8863 15.0779C16.2768 15.4684 16.91 15.4684 17.3005 15.0779C17.6911 14.6873 17.6911 14.0542 17.3005 13.6636L15.4884 11.8515C14.3656 10.7287 12.5453 10.7287 11.4225 11.8515L7.04289 16.2311C6.65237 16.6216 6.65237 17.2548 7.04289 17.6453C7.43342 18.0358 8.06658 18.0358 8.45711 17.6453L12.8367 13.2657Z"
      />
    </BaseIcon>
  );
});
