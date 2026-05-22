import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName.js';
import { BaseIcon } from '../BaseIcon.js';
import type { IconProps } from '../BaseIcon.js';

export const QuestionCircleIcon20Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'QuestionCircleIcon20Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={20} {...props}>
        <path d="M11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        <path d="M8.375 8.078c0-.642.63-1.328 1.625-1.328s1.625.686 1.625 1.328c0 .324-.09.504-.2.637-.13.16-.325.293-.617.466l-.113.065c-.247.142-.576.332-.834.571-.346.321-.61.765-.61 1.378a.75.75 0 1 0 1.5 0c0-.12.03-.186.13-.278.124-.115.284-.208.539-.357l.148-.086c.3-.177.7-.424 1.015-.805.336-.407.542-.927.542-1.59 0-1.654-1.496-2.829-3.125-2.829S6.875 6.425 6.875 8.078a.75.75 0 1 0 1.5 0z" />
        <path d="M2.001 10A7.999 7.999 0 1 1 18 10 7.999 7.999 0 0 1 2 10zm8-6.499A6.499 6.499 0 1 0 10 16.5 6.499 6.499 0 0 0 10 3.5z" />
      </BaseIcon>
    );
  },
);
