import React, { useContext, useRef } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { animations, styles } from './GlobalLoaderView.styles';
import { useWidthAndPosition } from './useWidthAndPosition';

export interface GlobalLoaderViewProps extends Pick<CommonProps, 'data-tid'> {
  expectedResponseTime: number;
  delayBeforeHide: number;
  status?: 'success' | 'error' | 'standard' | 'accept';
  disableAnimations: boolean;
}

export type GlobalLoaderViewRef = {
  element: HTMLDivElement;
  refObject: React.RefObject<GlobalLoaderViewRef['element']>;
};

export const GlobalLoaderView = ({
  expectedResponseTime,
  delayBeforeHide,
  status,
  disableAnimations,
  ...rest
}: GlobalLoaderViewProps) => {
  const ref = useRef<GlobalLoaderViewRef['element']>(null);
  const theme = useContext(ThemeContext);
  const { width, startWidth, left } = useWidthAndPosition(status, ref);

  const getAnimationClass = (status: GlobalLoaderViewProps['status']) => {
    if (!disableAnimations) {
      switch (status) {
        case 'success':
          return animations.successAnimation(delayBeforeHide, width, left);
        case 'accept':
          return animations.acceptAnimation(startWidth, expectedResponseTime);
        case 'error':
          return animations.errorAnimation(theme);
        case 'standard':
          return animations.standardAnimation(expectedResponseTime);
      }
    }

    if (disableAnimations) {
      switch (status) {
        case 'success':
          return styles.successWithoutAnimation();
        case 'accept':
          return animations.acceptWithoutAnimation(startWidth);
        case 'error':
          return styles.errorWithoutAnimation();
        case 'standard':
          return styles.standardWithoutAnimation();
      }
    }
  };

  return (
    <CommonWrapper {...rest}>
      <ZIndex priority="GlobalLoader" className={styles.outer(theme)}>
        <div ref={ref} className={cx(styles.inner(theme), getAnimationClass(status))} />
      </ZIndex>
    </CommonWrapper>
  );
};
