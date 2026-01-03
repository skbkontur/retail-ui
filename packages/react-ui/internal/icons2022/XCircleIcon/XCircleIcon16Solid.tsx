import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const XCircleIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>('XCircleIcon16Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={16} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM6.23223 4.81802C5.84171 4.4275 5.20854 4.4275 4.81802 4.81802C4.4275 5.20854 4.4275 5.84171 4.81802 6.23223L6.58579 8L4.81802 9.76777C4.4275 10.1583 4.4275 10.7915 4.81802 11.182C5.20854 11.5725 5.84171 11.5725 6.23223 11.182L8 9.41421L9.76777 11.182C10.1583 11.5725 10.7915 11.5725 11.182 11.182C11.5725 10.7915 11.5725 10.1583 11.182 9.76777L9.41421 8L11.182 6.23223C11.5725 5.84171 11.5725 5.20854 11.182 4.81802C10.7915 4.4275 10.1583 4.4275 9.76777 4.81802L8 6.58579L6.23223 4.81802Z"
      />
    </BaseIcon>
  );
});
