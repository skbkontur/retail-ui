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
  const globalLoaderViewRef: React.RefObject<HTMLDivElement> | null = React.useRef(null);
  const theme = React.useContext(ThemeContext);
  let currentWidth = 0;
  let currentLeftPosition = 0;
  if (globalLoaderViewRef) {
    currentWidth = globalLoaderViewRef.current?.getBoundingClientRect().width || 0;
    currentLeftPosition = globalLoaderViewRef.current?.getBoundingClientRect().left || 0;
  }
  return (
    <ZIndex priority="GlobalLoader" className={styles.outer(theme)}>
      <div
        ref={globalLoaderViewRef}
        className={cx(styles.inner(theme), {
          [animations.successAnimation(delayBeforeHide, currentWidth, currentLeftPosition)]:
            !disableAnimations && status === 'success',
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
