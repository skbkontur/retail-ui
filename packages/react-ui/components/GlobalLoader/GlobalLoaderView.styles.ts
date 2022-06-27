import { css, memoizeStyle, keyframes } from '../../lib/theming/Emotion';
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
  standardWithoutAnimation() {
    return css`
      left: 0;
      width: 90%;
    `;
  },
  successWithoutAnimation() {
    return css`
      left: 0;
      width: 100%;
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
  from { width: 80%; }
  to { width: 90% }
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
        20% {
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
    const transitionDuration = parseInt(t.globalLoaderTransitionToSpinnerDuration);
    const spinnerAnimationDuration = parseInt(t.globalLoaderSpinnerAnimationDuration);

    return css`
      left: 0;
      width: 100%;
      animation: ${moveToRightAnimation} ${transitionDuration}ms linear,
        ${spinnerAnimationDuration}ms ${spinnerAnimation} ${transitionDuration}ms infinite alternate;
    `;
  },
  standardAnimation(t: Theme, expectedTime: number) {
    const slowProgressAnimationTime = parseInt(t.globalLoaderSlowAnimationDuration);
    return css`
      width: 90%;
      animation: ${linearProgressAnimation} ${expectedTime}ms cubic-bezier(0, 0.4, 0.4, 1),
        ${slowProgressAnimationTime}ms ${slowProgressAnimation} ${expectedTime}ms linear;
    `;
  },
  acceptAnimation(t: Theme, startWidth: number, expectedTime: number, width: number, left: number) {
    const transitionTime = parseInt(t.globalLoaderTransitionFromSpinnerDuration);
    const slowProgressAnimationTime = parseInt(t.globalLoaderSlowAnimationDuration);
    return css`
      width: 90%;
      animation: transitionAnimation ${transitionTime}ms linear,
        ${expectedTime}ms acceptAnimation ${transitionTime}ms cubic-bezier(0, 0.4, 0.4, 1),
        ${slowProgressAnimationTime}ms ${slowProgressAnimation} ${expectedTime + transitionTime}ms linear;
      @keyframes transitionAnimation {
        from {
          width: ${width}px;
          left: ${left}px;
        }
        to {
          width: ${startWidth}px;
          left: 0;
        }
      }
      @keyframes acceptAnimation {
        from {
          width: ${startWidth}px;
        }
        to {
          width: 80%;
        }
      }
    `;
  },
  slowAcceptAnimation(t: Theme, startWidth: number, width: number, left: number) {
    const transitionTime = parseInt(t.globalLoaderTransitionFromSpinnerDuration);
    const slowProgressAnimationTime = parseInt(t.globalLoaderSlowAnimationDuration);
    return css`
      width: 90%;
      animation: transitionAnimation ${transitionTime}ms linear,
        ${slowProgressAnimationTime}ms acceptAnimation ${transitionTime}ms linear;
      @keyframes transitionAnimation {
        from {
          width: ${width}px;
          left: ${left}px;
        }
        to {
          width: ${startWidth}px;
          left: 0;
        }
      }
      @keyframes acceptAnimation {
        from {
          width: ${startWidth}px;
        }
        to {
          width: 90%;
        }
      }
    `;
  },
  acceptWithoutAnimation(startWidth: number) {
    return css`
      width: ${startWidth}px;
    `;
  },
};
