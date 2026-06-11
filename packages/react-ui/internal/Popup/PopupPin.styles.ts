import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  pin() {
    return css`
      position: absolute;
    `;
  },

  pinAnimated() {
    return css`
      opacity: 1;
      transition:
        left 0.18s cubic-bezier(0.22, 0.61, 0.36, 1),
        top 0.18s cubic-bezier(0.22, 0.61, 0.36, 1),
        opacity 0.15s ease-out,
        visibility 0.15s ease-out;
    `;
  },

  pinHidden() {
    return css`
      visibility: hidden;
      opacity: 0;
    `;
  },

  pinTop() {
    return css`
      clip-path: polygon(0 0, 50% 100%, 100% 0);
    `;
  },

  pinBottom() {
    return css`
      clip-path: polygon(0 100%, 50% 0, 100% 100%);
    `;
  },

  pinLeft() {
    return css`
      clip-path: polygon(0 0, 100% 50%, 0 100%);
    `;
  },

  pinRight() {
    return css`
      clip-path: polygon(100% 0, 0 50%, 100% 100%);
    `;
  },
}));
