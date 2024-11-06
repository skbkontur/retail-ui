import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    caption() {
      return emotion.css`
        display: inline-block;
        width: 100%;
      `;
    },
    container() {
      return emotion.css`
        display: inline-block;
        line-height: normal;
      `;
    },
  });
