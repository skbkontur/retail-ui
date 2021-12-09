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
        left: 0;
        width: 100%;
        transform: translateX(50%) scaleX(0.005);
        animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
      }
      50% {
        left: 0;
        width: 100%;
        transform: translateX(0%) scaleX(0.35);
        animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      }
      100% {
        left: 0;
        width: 100%;
        transform: translateX(-50%) scaleX(0.005);
      }
    `;
const linearProgressAnimation = keyframes`from { width: 0; }
        to { width: 80% }`;
const slowProgressAnimation = keyframes`
      from { width: 80% }
      to { width: 100% }
    `;

export const animations = {
  successAnimation() {
    return css`
      width: 100%;
      animation: none;
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
  standardAnimation(t: Theme, expectedTime: number) {
    const waitingFactor = parseInt(t.globalLoaderWaitingFactor);

    return css`
      animation: ${linearProgressAnimation} ${expectedTime}ms linear,
        ${expectedTime! * waitingFactor}ms ${slowProgressAnimation} ${expectedTime}ms ease-out;
    `;
  },
};
