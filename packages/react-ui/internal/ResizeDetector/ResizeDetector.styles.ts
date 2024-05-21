import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        position: relative;
        height: 100%;
      `;
    },

    iframe() {
      return emotion.css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        border: 0;
        background: transparent;
        opacity: 0;
      `;
    },

    content() {
      return emotion.css`
        position: relative;
      `;
    },

    fullHeight() {
      return emotion.css`
        height: 100%;
      `;
    },
  });
