import React from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper } from '../../internal/CommonWrapper';

import { animations, styles } from './GlobalLoaderView.styles';

export interface GlobalLoaderViewProps {
  expectedResponseTime: number;
  delayBeforeHide: number;
  status?: 'success' | 'error' | 'standard' | 'accept';
  disableAnimations: boolean;
}

export const GlobalLoaderView = (props: GlobalLoaderViewProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const theme = React.useContext(ThemeContext);
  const { width = 0, left = 0 } = ref.current?.getBoundingClientRect() || {};
  const [startWidth, setStartWidth] = React.useState(0);
  const { expectedResponseTime, delayBeforeHide, status, disableAnimations } = props;
  const prevStatus = usePrevious(status);
  React.useEffect(() => {
    if (prevStatus === 'standard' && status === 'error') {
      setStartWidth(width);
    } else if (prevStatus === 'error' && status === 'accept') {
      setStartWidth(startWidth);
    } else {
      setStartWidth(0);
    }
  }, [status]);

  return (
    <CommonWrapper {...props}>
      <ZIndex priority="GlobalLoader" className={styles.outer(theme)}>
        <div
          ref={ref}
          className={cx(styles.inner(theme), {
            [animations.successAnimation(delayBeforeHide, width, left)]: !disableAnimations && status === 'success',
            [styles.standardWithoutAnimation()]: disableAnimations && status === 'standard',
            [animations.acceptAnimation(startWidth, expectedResponseTime)]: !disableAnimations && status === 'accept',
            [animations.acceptWithoutAnimation(startWidth)]: disableAnimations && status === 'accept',
            [styles.successWithoutAnimation()]: disableAnimations && status === 'success',
            [animations.errorAnimation(theme)]: !disableAnimations && status === 'error',
            [styles.errorWithoutAnimation()]: disableAnimations && status === 'error',
            [animations.standardAnimation(expectedResponseTime)]: !disableAnimations && status === 'standard',
          })}
        />
      </ZIndex>
    </CommonWrapper>
  );
};
function usePrevious(value: any) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
