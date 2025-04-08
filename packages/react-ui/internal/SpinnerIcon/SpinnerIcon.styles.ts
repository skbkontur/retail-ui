import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        display: inline-block;
        margin-left: -1px;
        margin-right: -1px;
      `;
    },
    rootInline() {
      return emotion.css`
        margin-left: -0.0714285714285714em;
        margin-right: -0.0714285714285714em;
      `;
    },

    icon() {
      return emotion.css`
        margin-bottom: -3px;
        border-radius: 50%;
        overflow: visible;
      `;
    },

    iconInline() {
      return emotion.css`
        height: 1.1428571428571428em;
        width: 1.1428571428571428em;
        margin-bottom: -0.2428571428571428em;
        stroke-width: 0.10714285714285714em;
      `;
    },
  });
