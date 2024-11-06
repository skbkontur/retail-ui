import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        height: 100%;
        text-align: center;
      `;
    },

    rootAlignLeft() {
      return emotion.css`
        text-align: left;
      `;
    },

    rootAlignRight() {
      return emotion.css`
        text-align: right;
      `;
    },

    spring() {
      return emotion.css`
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      `;
    },

    container() {
      return emotion.css`
        display: inline-block;
        text-align: left;
        vertical-align: middle;
      `;
    },
  });
