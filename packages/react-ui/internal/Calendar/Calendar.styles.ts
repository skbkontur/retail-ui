import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
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
};

export const jsStyles = memoizeStyle(styles);
