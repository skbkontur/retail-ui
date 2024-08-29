import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        padding-right: 10px;
      `;
    },

    absolute() {
      return emotion.css`
        position: absolute;
        top: 0;
      `;
    },

    userSelectContain() {
      return emotion.css`
        user-select: text;
        -ms-user-select: element;
      `;
    },

    userSelectNone() {
      return emotion.css`
        user-select: none;
      `;
    },

    rightSide() {
      return emotion.css`
        padding-left: 0;
        visibility: visible;
      `;
    },
  });
