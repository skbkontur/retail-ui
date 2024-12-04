import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const EyeOpenIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>('EyeOpenIcon16Light', (props, ref) => {
  return (
    <BaseIcon ref={ref} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.75c-3.406 0-6.317 2.102-7.468 5.07a.5.5 0 0 0 0 .36c1.15 2.968 4.062 5.07 7.468 5.07 3.406 0 6.318-2.102 7.468-5.07a.5.5 0 0 0 0-.36C14.318 4.851 11.406 2.75 8 2.75Zm0 9.5c-2.916 0-5.412-1.757-6.463-4.25C2.587 5.507 5.084 3.75 8 3.75S13.412 5.507 14.463 8c-1.05 2.493-3.547 4.25-6.463 4.25Z"
      />
    </BaseIcon>
  );
});
