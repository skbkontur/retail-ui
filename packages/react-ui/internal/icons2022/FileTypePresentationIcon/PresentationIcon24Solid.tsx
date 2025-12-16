import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const PresentationIcon24Solid = forwardRefAndName<SVGSVGElement, IconProps>(
  'PresentationIcon24Solid',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M12 9.22584C9.91558 9.22584 8.22584 10.9156 8.22584 13C8.22584 15.0844 9.91558 16.7741 12 16.7741C14.0828 16.7741 15.7716 15.0869 15.7741 13.0046L12.2546 13.0046C12.1166 13.0046 12.0046 12.8927 12.0046 12.7546V9.22584L12 9.22584Z" />
        <path d="M15.2013 2.87868C14.6387 2.31607 13.8756 2 13.08 2H8C5.79086 2 4 3.79086 4 6V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V8.92003C20 8.12439 19.6839 7.36132 19.1213 6.79871L15.2013 2.87868ZM6.72584 13C6.72584 10.0872 9.08715 7.72584 12 7.72584C14.9128 7.72584 17.2741 10.0872 17.2741 13C17.2741 15.9128 14.9128 18.2741 12 18.2741C9.08715 18.2741 6.72584 15.9128 6.72584 13Z" />
      </BaseIcon>
    );
  },
);
