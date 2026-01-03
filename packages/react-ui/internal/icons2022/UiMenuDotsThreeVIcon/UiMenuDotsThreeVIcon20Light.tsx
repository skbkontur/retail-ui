import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const UiMenuDotsThreeVIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'UiMenuDotsThreeVIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M11.25 4.00391C11.25 4.69426 10.6904 5.25391 10 5.25391C9.30964 5.25391 8.75 4.69426 8.75 4.00391C8.75 3.31355 9.30964 2.75391 10 2.75391C10.6904 2.75391 11.25 3.31355 11.25 4.00391Z" />
        <path d="M11.25 9.99984C11.25 10.6902 10.6904 11.2498 10 11.2498C9.30964 11.2498 8.75 10.6902 8.75 9.99984C8.75 9.30949 9.30964 8.74984 10 8.74984C10.6904 8.74984 11.25 9.30949 11.25 9.99984Z" />
        <path d="M10 17.2458C10.6904 17.2458 11.25 16.6862 11.25 15.9958C11.25 15.3055 10.6904 14.7458 10 14.7458C9.30964 14.7458 8.75 15.3055 8.75 15.9958C8.75 16.6862 9.30964 17.2458 10 17.2458Z" />
      </BaseIcon>
    );
  },
);
