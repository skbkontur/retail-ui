import React from 'react';

import { isIE11 } from '../../lib/client';
import {
  SpinnerFallbackAnimationRunner,
  createOffsetAnimation,
  createLengthAnimation,
  createColorAnimation,
  createRotationAnimation,
} from '../../components/Spinner/SpinnerFallbackAnimation';
import { isTestEnv } from '../../lib/currentEnvironment';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './SpinnerIcon.styles';

export interface SpinnerIconProps {
  className: string;
  size: 'mini' | 'normal' | 'big';
  dimmed?: boolean;
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
};

export const SpinnerIcon = ({ size, className, dimmed, width, color }: SpinnerIconProps) => {
  const currentSize = sizes[size];
  const svgRef = React.useRef<SVGSVGElement>(null);

  if (isIE11 && !isTestEnv) {
    // This condition will not change during app's life time
    // So its OK to use hooks here
    // https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fallbackAnimationRef = React.useRef<SpinnerFallbackAnimationRunner | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { red, yellow, green, brand } = React.useContext(ThemeContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      const svg = svgRef.current;

      const setStyleProperty: CSSStyleDeclaration['setProperty'] = (...args) => {
        if (svg) {
          svg.style.setProperty(...args);
        }
      };

      fallbackAnimationRef.current = new SpinnerFallbackAnimationRunner(
        [
          createOffsetAnimation(0, -230, 1000, setStyleProperty, '%'),
          createLengthAnimation([62, 168], [187, 43], 2000, setStyleProperty, '%'),
          createRotationAnimation(0, 360, 2000, setStyleProperty),
          ...(dimmed ? [] : [createColorAnimation([red, yellow, green, brand], 1500, setStyleProperty)]),
        ],
        1000 / 60,
      );

      return () => {
        const fallbackAnimation = fallbackAnimationRef.current;
        if (fallbackAnimation) {
          fallbackAnimation.stop();
        }
        if (svg) {
          svg.removeAttribute('style');
        }
      };
    }, [dimmed, red, yellow, green, brand]);
  }

  return (
    <span className={styles.root()}>
      <svg
        viewBox={`0 0 ${currentSize.size} ${currentSize.size}`}
        className={cx(styles.icon(), className)}
        width={currentSize.size}
        height={currentSize.size}
        fill="none"
        stroke={color}
        strokeDasharray={`${(10 * currentSize.radius) / 6}, ${(27 * currentSize.radius) / 6}`}
        strokeDashoffset="0"
        strokeWidth={width || currentSize.width}
        ref={svgRef}
      >
        <circle cx={currentSize.size / 2} cy={currentSize.size / 2} r={currentSize.radius} />
      </svg>
    </span>
  );
};
