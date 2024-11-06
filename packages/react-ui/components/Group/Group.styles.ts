import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        display: inline-flex;
        line-height: normal;
      `;
    },

    fixed() {
      return emotion.css`
        flex-shrink: 0;
        display: inline-block;
      `;
    },

    stretch() {
      return emotion.css`
        flex-grow: 1;
        flex-shrink: 1;
      `;
    },

    stretchFallback() {
      return emotion.css`
        flex-basis: 100%;
      `;
    },

    item() {
      return emotion.css`
        margin-left: -1px;
      `;
    },

    itemFirst() {
      return emotion.css`
        margin-left: 0;
      `;
    },
  });
