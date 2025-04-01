import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const EyeOpenIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'EyeOpenIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 3.75c-4.998 0-9.303 2.966-11.26 7.233a2.437 2.437 0 0 0 0 2.034C2.696 17.284 7.001 20.25 12 20.25s9.303-2.966 11.26-7.233a2.437 2.437 0 0 0 0-2.034C21.304 6.716 16.999 3.75 12 3.75Zm-9.898 7.86C3.826 7.853 7.611 5.25 12 5.25c4.389 0 8.174 2.604 9.898 6.36a.937.937 0 0 1 0 .78c-1.724 3.756-5.509 6.36-9.898 6.36-4.389 0-8.174-2.604-9.898-6.36a.937.937 0 0 1 0-.78Z"
        />
      </BaseIcon>
    );
  },
);
