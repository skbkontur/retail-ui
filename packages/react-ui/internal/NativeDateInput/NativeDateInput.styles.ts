import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => ({
  inputTypeDate() {
    return css`
      width: 0px;
      height: 0px;
      padding: 0px;
      margin: 0px;
      line-height: 0px;
      transform: scale(0);
      border: none;
      overflow: hidden;
      opacity: 0;
    `;
  },
}));
