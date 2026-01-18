import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root() {
    return css`
      display: inline-block;
      position: relative;
      line-height: normal;
    `;
  },

  spinnerWrapper() {
    return css`
      display: inline-block;
      margin-right: -5px;
    `;
  },
}));
