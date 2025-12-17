import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const NetUploadIcon20Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'NetUploadIcon20Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M4.87327 7.06056C4.56369 7.33575 4.08963 7.30786 3.81444 6.99827C3.53925 6.68869 3.56714 6.21463 3.87673 5.93944L8.25604 2.04672C9.25062 1.16265 10.7494 1.16265 11.744 2.04672L16.1233 5.93944C16.4329 6.21463 16.4607 6.68869 16.1856 6.99827C15.9104 7.30786 15.4363 7.33575 15.1267 7.06056L10.75 3.17013V13.2501C10.75 13.6643 10.4142 14.0001 10 14.0001C9.58579 14.0001 9.25 13.6643 9.25 13.2501V3.17013L4.87327 7.06056Z" />
        <path d="M2.25 16.9999C2.25 16.5857 2.58579 16.2499 3 16.2499H17C17.4142 16.2499 17.75 16.5857 17.75 16.9999C17.75 17.4142 17.4142 17.7499 17 17.7499H3C2.58579 17.7499 2.25 17.4142 2.25 16.9999Z" />
      </BaseIcon>
    );
  },
);
