import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        display: inline-block;
        position: relative;
        line-height: normal;
      `;
    },

    spinnerWrapper() {
      return emotion.css`
        display: inline-block;
        margin-right: -5px;
      `;
    },
  });
