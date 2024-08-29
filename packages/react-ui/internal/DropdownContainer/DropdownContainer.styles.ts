import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    alignRight() {
      return emotion.css`
        display: flex;
        flex-direction: row-reverse;
      `;
    },
  });
