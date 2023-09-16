import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';
import { CommonProps } from '../../internal/CommonWrapper';

import { clickableStyles as styles } from './Clickable.styles';

export type ClickableProps = CommonProps;

export const ClickableDataTids = {
  root: 'Clickable__root',
} as const;

export const Clickable = forwardRefAndName<HTMLElement, ClickableProps>(
  'Clickable',
  ({ children, className, ...rest }: ClickableProps, ref) => {
    if (!React.isValidElement(children)) {
      return null;
    }

    return React.cloneElement(children as React.ReactElement, {
      className: cx(styles.root(), className),
      'data-tid': ClickableDataTids.root,
      ref,
      ...rest,
    });
  },
);
