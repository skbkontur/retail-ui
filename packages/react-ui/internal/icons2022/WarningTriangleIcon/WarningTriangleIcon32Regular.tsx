import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const WarningTriangleIcon32Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'WarningTriangleIcon32Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={32} {...props}>
        <path d="M17.2486 21.5001C17.2486 22.1896 16.6896 22.7485 16.0001 22.7485C15.3106 22.7485 14.7517 22.1896 14.7517 21.5001C14.7517 20.8106 15.3106 20.2516 16.0001 20.2516C16.6896 20.2516 17.2486 20.8106 17.2486 21.5001Z" />
        <path d="M17.0001 10.2502C17.0001 9.69787 16.5524 9.25015 16.0001 9.25015C15.4478 9.25015 15.0001 9.69787 15.0001 10.2502V17.5002C15.0001 18.0524 15.4478 18.5002 16.0001 18.5002C16.5524 18.5002 17.0001 18.0524 17.0001 17.5002V10.2502Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.582 3.92991C14.1399 1.36679 17.8602 1.36679 19.4181 3.92991L29.7469 20.9224C31.3672 23.588 29.4483 27 26.3288 27H5.67129C2.55183 27 0.632908 23.588 2.2532 20.9224L12.582 3.92991ZM17.7091 4.96874C16.9301 3.68718 15.07 3.68718 14.291 4.96874L3.96224 21.9612C3.1521 23.294 4.11156 25 5.67129 25H26.3288C27.8885 25 28.848 23.294 28.0378 21.9612L17.7091 4.96874Z"
        />
      </BaseIcon>
    );
  },
);
