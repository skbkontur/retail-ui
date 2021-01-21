import React from 'react';

import {
  SpinnerFallbackAnimationRunner,
  createOffsetAnimation,
  createLengthAnimation,
  createColorAnimation,
} from '../../components/Spinner/SpinnerFallbackAnimation';
import { isTestEnv } from '../../lib/currentEnvironment';
import { isIE11 } from '../../lib/client';
import { ThemeContext } from '../../lib/theming/ThemeContext';

const CLOUD_SVG_PATH = `M32.0297086,9.1495774 L31.5978628,8.5870774 C29.3570968,
      5.67148577 25.9305165,4 22.1999329,4 C17.3429265,
      4 12.9026663,7.04270463 11.154144,11.5717304 L10.901479,
      12.2253114 L10.2421341,12.4725311 C6.50853057,13.8727758 4,
      17.4719751 4,21.428492 C4,26.7061833 8.32047079,
      31 13.6314689,31 L32.0297086,31 C38.078569,31 43,26.1036477 43,
      20.0862989 C43,14.3602091 38.493302,9.5769573 32.7403918,
      9.19661922 L32.0297086,9.1495774 Z`;

export const SPINNER_CLOUD_SIZE = {
  height: 35,
  width: 47,
};

export interface SpinnerOldCloudIconProps {
  className: string;
  size: 'normal' | 'big';
  strokeClassName?: string;
  dimmed?: boolean;
}

export const SpinnerOldCloudIcon = ({ size, strokeClassName, className, dimmed }: SpinnerOldCloudIconProps) => {
  const pathRef = React.useRef<SVGPathElement>(null);

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
      if (isIE11 && !isTestEnv) {
        const setStyleProperty: CSSStyleDeclaration['setProperty'] = (...args) => {
          const path = pathRef.current;
          if (path) {
            path.style.setProperty(...args);
          }
        };

        fallbackAnimationRef.current = new SpinnerFallbackAnimationRunner(
          [
            createOffsetAnimation(10, 116, 1000, setStyleProperty),
            createLengthAnimation([10, 96], [50, 56], 2000, setStyleProperty),
            ...(dimmed ? [] : [createColorAnimation([red, yellow, green, brand], 1500, setStyleProperty)]),
          ],
          1000 / 60,
        );

        return () => {
          const fallbackAnimation = fallbackAnimationRef.current;
          const path = pathRef.current;
          if (fallbackAnimation) {
            fallbackAnimation.stop();
          }
          if (path) {
            path.removeAttribute('style');
          }
        };
      }
    }, [dimmed, red, yellow, green, brand]);
  }

  const multiply = size === 'big' ? 2 : 1;
  return (
    <svg width={SPINNER_CLOUD_SIZE.width * multiply} height={SPINNER_CLOUD_SIZE.height * multiply} viewBox="0 0 47 35">
      <path d={CLOUD_SVG_PATH} strokeWidth="2" className={strokeClassName} />
      <path d={CLOUD_SVG_PATH} strokeWidth="2" className={className} ref={pathRef} />
    </svg>
  );
};
