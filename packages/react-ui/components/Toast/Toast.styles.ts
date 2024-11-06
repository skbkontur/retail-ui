import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    enter() {
      return emotion.css`
        transform: translateY(-40px);
      `;
    },
    enterActive() {
      return emotion.css`
        transition: transform 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
        transform: translateY(0) !important;
      `;
    },
    exit() {
      return emotion.css`
        transform: translateY(0);
        opacity: 1;
      `;
    },
    exitActive() {
      return emotion.css`
        opacity: 0.01 !important;
        transition: opacity 0.15s ease-out;
      `;
    },
  });
