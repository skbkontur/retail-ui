import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const TextIcon64Regular = forwardRefAndName<SVGSVGElement, IconProps>('TextIcon64Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={64} {...props}>
      <path d="M21.5 24.5C21.5 23.6716 22.1716 23 23 23H40.5C41.3284 23 42 23.6716 42 24.5C42 25.3284 41.3284 26 40.5 26H33V43C33 43.8284 32.3284 44.5 31.5 44.5C30.6716 44.5 30 43.8284 30 43V26H23C22.1716 26 21.5 25.3284 21.5 24.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 16.5C11 10.701 15.701 6 21.5 6H35.9522C37.9413 6 39.8489 6.79017 41.2555 8.1967L50.8033 17.7445C52.2098 19.1511 53 21.0587 53 23.0478V47.5C53 53.299 48.299 58 42.5 58H21.5C15.701 58 11 53.299 11 47.5V16.5ZM21.5 9C17.3579 9 14 12.3579 14 16.5V47.5C14 51.6421 17.3579 55 21.5 55H42.5C46.6421 55 50 51.6421 50 47.5V23.0478C50 21.8544 49.5259 20.7098 48.682 19.8659L39.1341 10.318C38.2902 9.4741 37.1456 9 35.9522 9H21.5Z"
      />
    </BaseIcon>
  );
});
