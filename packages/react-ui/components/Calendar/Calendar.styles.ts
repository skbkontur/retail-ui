import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      const width = parseInt(t.calendarCellWidth) * 7;
      return emotion.css`
        background: ${t.calendarBg};
        box-sizing: content-box;
        border-radius: ${t.calendarBorderRadius};
        color: ${t.textColorDefault};
        display: block;
        padding: 0 ${t.calendarPaddingX};
        width: ${width}px;
        touch-action: none;
      `;
    },

    wrapper() {
      return emotion.css`
        font-size: 14px;
        position: relative;
        overflow: hidden;
      `;
    },

    separator(t: Theme) {
      return emotion.css`
        border-bottom: ${t.calendarBottomSeparatorBorder};
        margin: 0 ${t.calendarMonthTitleMarginX};
      `;
    },
  });
