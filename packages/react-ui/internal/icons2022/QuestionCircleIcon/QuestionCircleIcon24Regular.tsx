import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName.js';
import { BaseIcon } from '../BaseIcon.js';
import type { IconProps } from '../BaseIcon.js';

export const QuestionCircleIcon24Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'QuestionCircleIcon24Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={24} {...props}>
        <path d="M13 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        <path d="M9.75 9.887c0-.945.91-1.875 2.25-1.875 1.34 0 2.25.93 2.25 1.875 0 .453-.129.726-.297.93-.19.23-.462.414-.833.632-.046.028-.096.056-.148.086-.312.18-.706.408-1.013.693-.405.375-.709.886-.709 1.596a.75.75 0 0 0 1.5 0c0-.217.07-.35.23-.497.172-.16.396-.29.717-.477l.183-.107c.38-.223.858-.52 1.23-.972.395-.479.64-1.09.64-1.884 0-1.955-1.776-3.375-3.75-3.375s-3.75 1.42-3.75 3.375a.75.75 0 1 0 1.5 0z" />
        <path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5z" />
      </BaseIcon>
    );
  },
);
