import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from './Theme';

export const getAnimationKeyframes = (emotion: Emotion) => ({
  spinnerCircleOffset() {
    return emotion.keyframes`
        0% { stroke-dashoffset: 231.25%; }
        100% { stroke-dashoffset: 0%; }
      `;
  },
  spinnerCircleLength() {
    return emotion.keyframes`
        0% { stroke-dasharray: 62.5%, 168.75%; }
        50% {  stroke-dasharray: 187.5%, 43.75%; }
        100% { stroke-dasharray: 62.5%, 168.75%; }
      `;
  },
  spinnerCircleRotate() {
    return emotion.keyframes`
        100% { transform: rotate(360deg); }
      `;
  },
  spinnerColor(t: Theme) {
    return emotion.keyframes`
        100%, 0% { stroke: ${t.red}; }
        40% { stroke: ${t.yellow}; }
        66% { stroke: ${t.green}; }
        80%, 90% { stroke: ${t.brand}; }
      `;
  },
});
