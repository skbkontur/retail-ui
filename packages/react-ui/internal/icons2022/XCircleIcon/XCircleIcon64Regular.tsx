import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const XCircleIcon64Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'XCircleIcon64Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={64} {...props}>
        <path d="M22.5763 20.455C21.9905 19.8692 21.0408 19.8692 20.455 20.455C19.8692 21.0407 19.8692 21.9905 20.455 22.5763L29.8787 32L20.455 41.4237C19.8692 42.0095 19.8692 42.9593 20.455 43.545C21.0408 44.1308 21.9905 44.1308 22.5763 43.545L32 34.1213L41.4237 43.545C42.0095 44.1308 42.9593 44.1308 43.545 43.545C44.1308 42.9593 44.1308 42.0095 43.545 41.4237L34.1213 32L43.545 22.5763C44.1308 21.9905 44.1308 21.0407 43.545 20.455C42.9593 19.8692 42.0095 19.8692 41.4237 20.455L32 29.8787L22.5763 20.455Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32 6C17.6406 6 6 17.6406 6 32C6 46.3594 17.6406 58 32 58C46.3594 58 58 46.3594 58 32C58 17.6406 46.3594 6 32 6ZM9 32C9 19.2975 19.2975 9 32 9C44.7025 9 55 19.2975 55 32C55 44.7025 44.7025 55 32 55C19.2975 55 9 44.7025 9 32Z"
        />
      </BaseIcon>
    );
  },
);
