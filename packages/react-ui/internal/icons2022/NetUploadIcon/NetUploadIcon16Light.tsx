import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const NetUploadIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'NetUploadIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M8 2.127c.056.032.109.07.159.114l3.012 2.635a.5.5 0 0 0 .658-.752L8.817 1.488a2 2 0 0 0-2.634 0L3.171 4.124a.5.5 0 1 0 .658.752l3.012-2.635c.05-.044.103-.082.159-.114V10.5a.5.5 0 1 0 1 0V2.127Z" />
        <path d="M1 13.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5Z" />
      </BaseIcon>
    );
  },
);
