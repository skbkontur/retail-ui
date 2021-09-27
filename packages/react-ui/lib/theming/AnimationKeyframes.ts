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
        0% { width: 0; }
        10% { width: 10% }
        20% { width: 19% }
        30% { width: 28% }
        40% { width: 37% }
        50% { width: 46% }
        60% { width: 55% }
        70% { width: 64% }
        80% { width: 73% }
        90% { width: 82% }
        100% { width: 90% }
      `;
  },
  globalLoaderSlowProgress() {
    return keyframes`
        0% { width: 90% }
        25% { width: 92% }
        50% { width: 95% }
        75% { width: 97% }
        100% { width: 100% }
      `;
  },
};
