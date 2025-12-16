import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const WarningTriangleIcon20Solid = forwardRefAndName<SVGSVGElement, IconProps>(
  'WarningTriangleIcon20Solid',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.90871 2.31918C8.86388 0.754934 11.1355 0.754933 12.0907 2.31918L18.6258 13.0215C19.6227 14.6541 18.4477 16.7483 16.5348 16.7483H3.46458C1.55169 16.7483 0.376694 14.6541 1.37359 13.0215L7.90871 2.31918ZM11.1248 13.3749C11.1248 13.9963 10.6211 14.4999 9.99976 14.4999C9.37844 14.4999 8.87476 13.9963 8.87476 13.3749C8.87476 12.7536 9.37844 12.2499 9.99976 12.2499C10.6211 12.2499 11.1248 12.7536 11.1248 13.3749ZM10.9999 5.99995C10.9999 5.44766 10.5522 4.99995 9.99988 4.99995C9.44759 4.99995 8.99988 5.44766 8.99988 5.99995V9.74995C8.99988 10.3022 9.44759 10.7499 9.99988 10.7499C10.5522 10.7499 10.9999 10.3022 10.9999 9.74995V5.99995Z"
        />
      </BaseIcon>
    );
  },
);
