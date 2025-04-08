import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    inputTypeDate() {
      return emotion.css`
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
  });
