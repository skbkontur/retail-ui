import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    wrapper() {
      return emotion.css`
        display: flex;
      `;
    },
    inner() {
      return emotion.css`
        display: flex;
        width: 100%;
      `;
    },

    fixed() {
      return emotion.css`
        position: fixed;
      `;
    },

    stopped() {
      return emotion.css`
        position: relative;
      `;
    },

    container() {
      return emotion.css`
        flex: auto;
        width: 100%;
      `;
    },
  });
