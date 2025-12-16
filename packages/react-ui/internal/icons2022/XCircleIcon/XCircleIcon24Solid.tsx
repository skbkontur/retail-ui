import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const XCircleIcon24Solid = forwardRefAndName<SVGSVGElement, IconProps>('XCircleIcon24Solid', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={24} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9.04879 7.63458C8.65826 7.24406 8.0251 7.24406 7.63458 7.63458C7.24405 8.02511 7.24405 8.65827 7.63458 9.0488L10.5858 12L7.63458 14.9512C7.24405 15.3417 7.24405 15.9749 7.63458 16.3654C8.0251 16.7559 8.65826 16.7559 9.04879 16.3654L12 13.4142L14.9512 16.3654C15.3417 16.7559 15.9749 16.7559 16.3654 16.3654C16.7559 15.9749 16.7559 15.3417 16.3654 14.9512L13.4142 12L16.3654 9.0488C16.7559 8.65827 16.7559 8.02511 16.3654 7.63458C15.9749 7.24406 15.3417 7.24406 14.9512 7.63458L12 10.5858L9.04879 7.63458Z"
      />
    </BaseIcon>
  );
});
