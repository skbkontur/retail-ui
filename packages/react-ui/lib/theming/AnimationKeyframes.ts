import { keyframes } from './Emotion';
import { Theme } from './Theme';

export const AnimationKeyframes = {
  spinnerCloudOffset(t: Theme) {
    return keyframes`
        0% { stroke-dashoffset: 10; }
        100% { stroke-dashoffset: 116; }
      `;
  },

  spinnerCloudLength(t: Theme) {
    return keyframes`
        0% { stroke-dasharray: 10, 96; }
        50% { stroke-dasharray: 50, 56; }
        100% { stroke-dasharray: 10, 96;}
      `;
  },
  spinnerCircleOffset(t: Theme) {
    return keyframes`
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -231.25%; }
      `;
  },
  spinnerCircleLength(t: Theme) {
    return keyframes`
        0% { stroke-dasharray: 62.5%, 168.75%; }
        50% {  stroke-dasharray: 187.5%, 43.75%; }
        100% { stroke-dasharray: 62.5%, 168.75%; }
      `;
  },
  spinnerCircleRotate(t: Theme) {
    return keyframes`
        100% { transform: rotate(360deg); }
      `;
  },
  spinnerColor(t: Theme) {
    return keyframes`
        100%, 0% { stroke: ${t.red}; }
        40% { stroke: ${t.yellow}; }
        66% { stroke: ${t.green}; }
        80%, 90% { stroke: ${t.brand}; }
      `;
  },
  globalLoaderProgress() {
    return keyframes`
        from { width: 0; }
        to { width: 80% }
      `;
  },
  globalLoaderSlowProgress() {
    return keyframes`
      from { width: 80% }
      to { width: 100% }
    `;
  },
  globalLoaderSpinner() {
    return keyframes`
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
  },
  globalSpinnerMoveToRight() {
    return keyframes`
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
  },
};
