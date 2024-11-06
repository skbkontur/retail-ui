import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    wrapper() {
      return emotion.css`
        overflow: hidden;
        position: absolute;
        pointer-events: none;
      `;
    },
  });
