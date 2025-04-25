import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const NetUploadIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'NetUploadIcon20Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M9.997 2.46c.146.056.284.139.407.247L14.169 6a.5.5 0 0 0 .659-.752l-3.766-3.295a2.375 2.375 0 0 0-3.127 0L4.169 5.25A.5.5 0 1 0 4.828 6l3.765-3.294c.124-.108.262-.19.407-.247a.508.508 0 0 0-.002.04L9 13.5a.5.5 0 1 0 1 0l-.002-11-.001-.04Z" />
        <path d="M2.5 16.5A.5.5 0 0 1 3 16h13a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5Z" />
      </BaseIcon>
    );
  },
);
