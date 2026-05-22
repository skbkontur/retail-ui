import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName.js';
import { BaseIcon } from '../BaseIcon.js';
import type { IconProps } from '../BaseIcon.js';

export const QuestionCircleIcon16Light = forwardRefAndName<SVGSVGElement, IconProps>(
  'QuestionCircleIcon16Light',
  (props, ref) => {
    return (
      <BaseIcon ref={ref} {...props}>
        <path d="M8.25 10.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" />
        <path d="M6.012 5.838c0-.646.61-1.267 1.49-1.267s1.49.621 1.49 1.267c0 .477-.32.93-.851 1.145C7.53 7.231 7 7.718 7 8.489a.5.5 0 0 0 1 0c0-.215.123-.42.516-.58.842-.342 1.475-1.12 1.475-2.07 0-1.307-1.172-2.268-2.49-2.268-1.318 0-2.49.96-2.49 2.267a.5.5 0 0 0 1 0z" />
        <path d="M1 7.5a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0zM7.5 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z" />
      </BaseIcon>
    );
  },
);
