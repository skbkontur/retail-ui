import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const QuestionCircleIcon16Solid = forwardRefAndName<SVGSVGElement, IconProps>(
  'QuestionCircleIcon16Solid',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5.873 3.779a1.127 1.127 0 1 1-2.254 0 1.127 1.127 0 0 1 2.254 0ZM6.56 6.27c0-.377.457-.987 1.44-.987.983 0 1.44.61 1.44.987 0 .286-.221.668-.78.874-.734.27-1.535.864-1.535 1.92a.875.875 0 1 0 1.75 0c0-.02.003-.03.005-.033a.137.137 0 0 1 .028-.04c.044-.048.15-.128.357-.205 1.038-.382 1.925-1.296 1.925-2.516 0-1.68-1.615-2.737-3.19-2.737S4.81 4.59 4.81 6.27a.875.875 0 1 0 1.75 0Z"
        />
      </BaseIcon>
    );
  },
);
