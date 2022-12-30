import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    const width = parseInt(t.calendarCellSize) * 7;
    return css`
      box-sizing: content-box;
      color: ${t.textColorDefault};
      display: block;
      padding: 0 ${t.calendarPaddingX};
      width: ${width}px;
      overflow: hidden;
      touch-action: none;
    `;
  },

  wrapper() {
    return css`
      font-size: 14px;
      position: relative;
    `;
  },

  separator(t: Theme) {
    const marginX = parseInt(t.calendarMonthTitleMarginX) + parseInt(t.calendarPaddingX);

    return css`
      border-bottom: 1px solid ${t.calendarMonthTitleBorderBottomColor};
      margin: 0 ${marginX}px;
    `;
  },
});
