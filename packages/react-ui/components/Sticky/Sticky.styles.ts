import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  wrapper() {
    return css`
      display: flex;
    `;
  },
  inner() {
    return css`
      display: flex;
      width: 100%;
    `;
  },

  fixed() {
    return css`
      position: fixed;
    `;
  },

  stopped() {
    return css`
      position: relative;
    `;
  },

  container() {
    return css`
      flex: auto;
      width: 100%;
    `;
  },
}));
