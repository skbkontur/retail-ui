import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        display: inline-block;
        margin-left: -0.0714285714285714em;
        margin-right: -0.0714285714285714em;
      `;
    },

    icon() {
      return emotion.css`
        height: 1.1428571428571428em;
        width: 1.1428571428571428em;
        margin-bottom: -0.1428571428571428em;
      `;
    },
  });
