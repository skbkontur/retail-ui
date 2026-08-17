import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => ({
  inputTypeTime() {
    return css`
      width: 0;
      height: 0;
      padding: 0;
      margin: 0;
      line-height: 0;
      transform: scale(0);
      border: none;
      overflow: hidden;
      opacity: 0;
    `;
  },
}));
