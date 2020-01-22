import React from 'react';

import { cx } from '../../../lib/theming/Emotion';

import styles from './SpinnerIcon.module.less';

export interface SpinnerIconProps {
  className: string;
  size: 'mini' | 'normal' | 'big';
}

export const SpinnerIcon = ({ size, className }: SpinnerIconProps) => {
  const multiply = size === 'big' ? 3 : size === 'normal' ? 2 : 1;
  return (
    <svg
      viewBox={`0 0 ${16 * multiply} ${16 * multiply}`}
      className={cx(styles.icon, className)}
      width={16 * multiply}
      height={16 * multiply}
      fill="none"
      strokeDasharray={`${10 * multiply}, ${27 * multiply}`}
      strokeDashoffset="0"
      strokeWidth={1.5 * multiply}
    >
      <circle cx={8 * multiply} cy={8 * multiply} r={6 * multiply} />
    </svg>
  );
};
