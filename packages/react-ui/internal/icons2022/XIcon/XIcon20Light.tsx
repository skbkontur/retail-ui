import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const XIcon20Light = forwardRefAndName<SVGSVGElement, IconProps>('XIcon20Light', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={20} {...props}>
      <path d="M4.146 4.146a.5.5 0 0 1 .708 0L10 9.293l5.146-5.147a.5.5 0 1 1 .707.708L10.707 10l5.146 5.146a.5.5 0 1 1-.707.707L10 10.707l-5.146 5.146a.5.5 0 1 1-.708-.707L9.293 10 4.146 4.854a.5.5 0 0 1 0-.708Z" />
    </BaseIcon>
  );
});
