import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import { BaseIcon, IconProps } from '../BaseIcon';

export const EyeOpenIcon16Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'EyeOpenIcon16Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 4.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM6.25 8a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 2.25c-3.631 0-6.728 2.279-7.95 5.483a.75.75 0 0 0 0 .534C1.272 11.471 4.369 13.75 8 13.75c3.631 0 6.728-2.279 7.95-5.483a.75.75 0 0 0 0-.534C14.729 4.529 11.631 2.25 8 2.25Zm0 10A7.011 7.011 0 0 1 1.56 8 7.011 7.011 0 0 1 8 3.75 7.01 7.01 0 0 1 14.44 8 7.01 7.01 0 0 1 8 12.25Z"
        />
      </BaseIcon>
    );
  },
);
