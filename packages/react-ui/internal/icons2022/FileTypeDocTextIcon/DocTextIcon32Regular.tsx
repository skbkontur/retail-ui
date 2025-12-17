import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const DocTextIcon32Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'DocTextIcon32Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={32} {...props}>
        <path d="M9.5 22C9.5 21.4477 9.94771 21 10.5 21H16.5C17.0523 21 17.5 21.4477 17.5 22C17.5 22.5523 17.0523 23 16.5 23H10.5C9.94771 23 9.5 22.5523 9.5 22Z" />
        <path d="M10.5 17C9.94771 17 9.5 17.4477 9.5 18C9.5 18.5523 9.94771 19 10.5 19H21.5C22.0523 19 22.5 18.5523 22.5 18C22.5 17.4477 22.0523 17 21.5 17H10.5Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27 24.5C27 27.5376 24.5376 30 21.5 30H10.5C7.46243 30 5 27.5376 5 24.5V7.5C5 4.46243 7.46243 2 10.5 2H17.2261C18.287 2 19.3044 2.42143 20.0546 3.17157L25.8284 8.94543C26.5786 9.69558 27 10.713 27 11.7739V24.5ZM7 7.5C7 5.567 8.567 4 10.5 4H16V9.5C16 11.433 17.567 13 19.5 13H25V24.5C25 26.433 23.433 28 21.5 28H10.5C8.567 28 7 26.433 7 24.5V7.5ZM24.8442 11H19.5C18.6716 11 18 10.3284 18 9.5V4.15578C18.2371 4.25526 18.455 4.40046 18.6404 4.58579L24.4142 10.3596C24.5995 10.545 24.7447 10.7629 24.8442 11Z"
        />
      </BaseIcon>
    );
  },
);
