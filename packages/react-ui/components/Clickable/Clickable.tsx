import React from 'react';

import { cx } from '../../lib/theming/Emotion';
import { CommonProps } from '../../internal/CommonWrapper';

import { clickableStyles as styles } from './Clickable.styles';

export interface ClickableProps extends Omit<CommonProps, 'children'> {
  render: React.ComponentType<any>;
}

export const ClickableDataTids = {
  root: 'Clickable__root',
} as const;

export function Clickable({ render: Component, className, ...rest }: ClickableProps) {
  return <Component className={cx(styles.root(), className)} data-tid={ClickableDataTids.root} {...rest} />;
}

const componentName = 'Clickable';
Clickable.displayName = componentName;
Clickable.__KONTUR_REACT_UI__ = componentName;
