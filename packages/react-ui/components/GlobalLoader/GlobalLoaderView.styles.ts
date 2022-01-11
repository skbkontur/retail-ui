import { keyframes } from '@emotion/css';

import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  outer(t: Theme) {
    return css`
      width: ${t.globalLoaderWidth};
      height: ${t.globalLoaderHeight};
      background-color: ${t.globalLoaderBackgroundColor};
      position: ${t.globalLoaderPosition};
      left: ${t.globalLoaderLeft};
      top: ${t.globalLoaderTop};
      right: ${t.globalLoaderRight};
      bottom: ${t.globalLoaderBottom};
      overflow: hidden;
    `;
  },
  inner(t: Theme) {
    return css`
      background-color: ${t.globalLoaderColor};
      width: 0;
      height: ${t.globalLoaderHeight};
      position: absolute;
      left: 0;
      overflow: hidden;
    `;
  },
  error() {
    return css`
      left: 0;
      width: 100%;
    `;
  },
  successWithoutAnimation() {
    return css`
      left: 0;
      width: 80%;
    `;
  },
  errorWithoutAnimation() {
    return css`
      left: 40%;
      width: 20%;
    `;
  },
});

const moveToRightAnimation = keyframes`
  0% {
    left: 0;
    width: 100%;
  }
  50% {
    left: 50%;
    width: 50%;
  }
  100% {
    left: 99%;
    width: 1%
  }
`;
const spinnerAnimation = keyframes`
  0% {
    transform: translateX(50%) scaleX(.005);
    animation-timing-function: cubic-bezier(.895,.03,.685,.22);
  }
  50% {
    transform: translateX(0) scaleX(.35);
    animation-timing-function: cubic-bezier(.165,.84,.44,1);
  }
  100% {
    transform: translateX(-50%) scaleX(.005);
  }
`;
const linearProgressAnimation = keyframes`
  from { width: 0; }
  to { width: 80% }
`;
const slowProgressAnimation = keyframes`
  from { width: 80% }
  to { width: 100% }
`;

export const animations = {
  successAnimation(delayBeforeHide: number, width: number, left: number) {
    return css`
      animation: successAnimation;
      animation-duration: ${delayBeforeHide}ms;
      @keyframes successAnimation {
        0% {
          width: ${width}px;
          left: ${left}px;
          opacity: 1;
        }
        50% {
          width: 100%;
          left: 0;
          opacity: 1;
        }
        80% {
          width: 100%;
          left: 0;
          opacity: 1;
        }
        100% {
          width: 100%;
          opacity: 0;
        }
      }
    `;
  },
  errorAnimation(t: Theme) {
    const transitionDuration = parseInt(t.globalLoaderTransitionDuration);
    const spinnerAnimationDuration = parseInt(t.globalLoaderSpinnerAnimationDuration);

    return css`
      animation: ${moveToRightAnimation} ${transitionDuration}ms linear,
        ${spinnerAnimationDuration}ms ${spinnerAnimation} ${transitionDuration}ms infinite alternate;
    `;
  },
  standardAnimation(t: Theme, expectedTime: number, overtime: number) {
    return css`
      animation: ${linearProgressAnimation} ${expectedTime}ms ease-out,
        ${overtime}ms ${slowProgressAnimation} ${expectedTime}ms ease-out;
    `;
  },
};
