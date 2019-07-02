import { keyframes } from './Emotion';
import { ITheme } from './Theme';

export const AnimationKeyframes = {
  spinnerCloudOffset(t: ITheme) {
    return keyframes`
        0% { stroke-dashoffset: 10; }
        100% { stroke-dashoffset: 116; }
      `;
  },

  spinnerCloudLength(t: ITheme) {
    return keyframes`
        0% { stroke-dasharray: 10, 96; }
        50% { stroke-dasharray: 50, 56; }
        100% { stroke-dasharray: 10, 96;}
      `;
  },
  spinnerCircleOffset(t: ITheme) {
    return keyframes`
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -37; }
      `;
  },
  spinnerCircleLength(t: ITheme) {
    return keyframes`
        0% { stroke-dasharray: 10, 27; }
        50% {  stroke-dasharray: 30, 7; }
        100% { stroke-dasharray: 10, 27; }
      `;
  },
  spinnerCircleRotate(t: ITheme) {
    return keyframes`
        100% { transform: rotate(360deg); }
      `;
  },
  spinnerColor(t: ITheme) {
    return keyframes`
        100%, 0% { stroke: ${t.red}; }
        40% { stroke: ${t.yellow}; }
        66% { stroke: ${t.green}; }
        80%, 90% { stroke: ${t.brand}; }
      `;
  },
};
