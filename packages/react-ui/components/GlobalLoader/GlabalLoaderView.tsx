import React from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { animations, styles } from './GlobalLoaderView.styles';

export interface GlobalLoaderViewProps {
  expectedResponseTime: number;
  delayBeforeHide: number;
  status?: 'success' | 'error' | 'standard';
  disableAnimations: boolean;
  overtime: number;
}

export const GlobalLoaderView = ({
  expectedResponseTime,
  delayBeforeHide,
  status,
  disableAnimations,
  overtime,
}: GlobalLoaderViewProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const theme = React.useContext(ThemeContext);
  const { width = 0, left = 0 } = ref.current?.getBoundingClientRect() || {};

  return (
    <ZIndex priority="GlobalLoader" className={styles.outer(theme)}>
      <div
        ref={ref}
        className={cx(styles.inner(theme), {
          [animations.successAnimation(delayBeforeHide, width, left)]: !disableAnimations && status === 'success',
          [styles.standardWithoutAnimation()]: disableAnimations && status === 'standard',
          [styles.successWithoutAnimation()]: disableAnimations && status === 'success',
          [animations.errorAnimation(theme)]: !disableAnimations && status === 'error',
          [styles.errorWithoutAnimation()]: disableAnimations && status === 'error',
          [animations.standardAnimation(theme, expectedResponseTime, overtime)]:
            !disableAnimations && status === 'standard',
        })}
      />
    </ZIndex>
  );
};
