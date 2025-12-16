import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const XCircleIcon20Solid = forwardRefAndName<SVGSVGElement, IconProps>('XCircleIcon20Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM7.81801 6.4038C7.42749 6.01328 6.79432 6.01328 6.4038 6.4038C6.01327 6.79432 6.01327 7.42749 6.4038 7.81801L8.58579 10L6.4038 12.182C6.01327 12.5725 6.01327 13.2057 6.4038 13.5962C6.79432 13.9867 7.42749 13.9867 7.81801 13.5962L10 11.4142L12.182 13.5962C12.5725 13.9867 13.2057 13.9867 13.5962 13.5962C13.9867 13.2057 13.9867 12.5725 13.5962 12.182L11.4142 10L13.5962 7.81801C13.9867 7.42749 13.9867 6.79432 13.5962 6.4038C13.2057 6.01328 12.5725 6.01328 12.182 6.4038L10 8.58579L7.81801 6.4038Z"
      />
    </BaseIcon>
  );
});
