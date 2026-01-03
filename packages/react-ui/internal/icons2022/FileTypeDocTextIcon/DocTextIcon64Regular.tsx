import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const DocTextIcon64Regular = forwardRefAndName<SVGSVGElement, IconProps>(
  'DocTextIcon64Regular',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBoxSize={64} {...props}>
        <path d="M36 12.5C36 11.6716 35.3284 11 34.5 11C33.6716 11 33 11.6716 33 12.5V18.5C33 22.0899 35.9101 25 39.5 25H46.5C47.3284 25 48 24.3284 48 23.5C48 22.6716 47.3284 22 46.5 22H39.5C37.567 22 36 20.433 36 18.5V12.5Z" />
        <path d="M19.5 41.5C19.5 40.6716 20.1716 40 21 40H33C33.8284 40 34.5 40.6716 34.5 41.5C34.5 42.3284 33.8284 43 33 43H21C20.1716 43 19.5 42.3284 19.5 41.5Z" />
        <path d="M21 34C20.1716 34 19.5 34.6716 19.5 35.5C19.5 36.3284 20.1716 37 21 37H43C43.8284 37 44.5 36.3284 44.5 35.5C44.5 34.6716 43.8284 34 43 34H21Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.5 6C15.701 6 11 10.701 11 16.5V47.5C11 53.299 15.701 58 21.5 58H42.5C48.299 58 53 53.299 53 47.5V23.0478C53 21.0587 52.2098 19.1511 50.8033 17.7445L41.2555 8.1967C39.8489 6.79017 37.9413 6 35.9522 6H21.5ZM14 16.5C14 12.3579 17.3579 9 21.5 9H35.9522C37.1456 9 38.2902 9.4741 39.1341 10.318L48.682 19.8659C49.5259 20.7098 50 21.8544 50 23.0478V47.5C50 51.6421 46.6421 55 42.5 55H21.5C17.3579 55 14 51.6421 14 47.5V16.5Z"
        />
      </BaseIcon>
    );
  },
);
