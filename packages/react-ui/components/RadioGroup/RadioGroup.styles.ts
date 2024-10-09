import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        display: inline-block;
        user-select: none;
        cursor: default;
        line-height: normal;
      `;
    },

    item(t: Theme) {
      return emotion.css`
        display: table;
        margin-top: ${t.radioGroupLegacyItemGap};
        width: 100%;
      `;
    },

    itemFirst() {
      return emotion.css`
        margin-top: 0;
      `;
    },

    itemInline() {
      return emotion.css`
        display: inline-table;
        margin-right: 15px;
        margin-top: 0;
        width: auto;
      `;
    },
  });
