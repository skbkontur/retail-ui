import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const XCircleIcon32Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'XCircleIcon32Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={32} {...props}>
        <path d="M12.0527 10.6385C11.6622 10.248 11.029 10.248 10.6385 10.6385C10.248 11.029 10.248 11.6622 10.6385 12.0527L14.5858 16L10.6385 19.9473C10.248 20.3378 10.248 20.971 10.6385 21.3615C11.029 21.752 11.6622 21.752 12.0527 21.3615L16 17.4142L19.9473 21.3615C20.3378 21.752 20.971 21.752 21.3615 21.3615C21.752 20.971 21.752 20.3378 21.3615 19.9473L17.4142 16L21.3615 12.0527C21.752 11.6622 21.752 11.029 21.3615 10.6385C20.971 10.248 20.3378 10.248 19.9473 10.6385L16 14.5858L12.0527 10.6385Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3ZM5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16Z"
        />
      </BaseIcon>
    );
  },
);
