import React from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './SpinnerIcon.styles.js';

interface SpinnerIconSize {
  size: number;
  width: number;
  radius: number;
}

export interface SpinnerIconProps {
  className?: string;
  size: SpinnerIconSize | keyof typeof sizes;
  inline?: boolean;
  width?: number;
  color?: React.CSSProperties['color'];
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
} as const;

const isSizeAlias = (size: unknown): size is keyof typeof sizes => {
  return typeof size === 'string' && size in sizes;
};

export const SpinnerIcon = ({ size, className, inline, width, color }: SpinnerIconProps) => {
  const _size = isSizeAlias(size) ? sizes[size] : size;
  const currentSize = inline ? sizes.mini : _size;

  const { cx } = useEmotion();
  const styles = useStyles(getStyles);

  return (
    <span className={cx(styles.root(), { [styles.rootInline()]: inline })}>
      <svg
        viewBox={`0 0 ${currentSize.size} ${currentSize.size}`}
        className={cx(styles.icon(), className, {
          [styles.iconInline()]: inline,
        })}
        width={currentSize.size}
        height={currentSize.size}
        fill="none"
        stroke={color}
        strokeDasharray={`${(10 * currentSize.radius) / 6}, ${(27 * currentSize.radius) / 6}`}
        strokeDashoffset="0"
        strokeWidth={width || currentSize.width}
        focusable="false"
        aria-hidden="true"
      >
        <circle cx={currentSize.size / 2} cy={currentSize.size / 2} r={currentSize.radius} />
      </svg>
    </span>
  );
};
