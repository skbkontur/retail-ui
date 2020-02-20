import React from 'react';

import { cx } from '../../../lib/theming/Emotion';

import styles from './SpinnerIcon.module.less';

export interface SpinnerIconProps {
  className: string;
  size: 'mini' | 'normal' | 'big';
}

export const sizes = {
  big: {
    size: 96,
    width: 4,
    radius: 32,
  },
  normal: {
    size: 48,
    width: 2,
    radius: 16,
  },
  mini: {
    size: 16,
    width: 1.5,
    radius: 6,
  },
};

export const SpinnerIcon = ({ size, className }: SpinnerIconProps) => {
  const currentSize = sizes[size];
  return (
    <span className={styles.root}>
      <svg
        viewBox={`0 0 ${currentSize.size} ${currentSize.size}`}
        className={cx(styles.icon, className)}
        width={currentSize.size}
        height={currentSize.size}
        fill="none"
        strokeDasharray={`${(10 * currentSize.radius) / 6}, ${(27 * currentSize.radius) / 6}`}
        strokeDashoffset="0"
        strokeWidth={currentSize.width}
      >
        <circle cx={currentSize.size / 2} cy={currentSize.size / 2} r={currentSize.radius} />
      </svg>
    </span>
  );
};
