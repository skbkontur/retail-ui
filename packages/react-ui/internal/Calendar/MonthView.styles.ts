import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  headerMonth() {
    return css`
      display: inline-block;
    `;
  },

  headerYear() {
    return css`
      display: inline-block;
      position: absolute;
      right: 0;
    `;
  },

  month() {
    return css`
      position: absolute;
      width: 210px;
    `;
  },

  headerSticky(t: Theme) {
    return css`
      background-color: ${t.calendarMonthHeaderStickedBgColor};
      z-index: 1;
    `;
  },

  monthTitle(t: Theme) {
    return css`
      border-bottom: 1px solid ${t.calendarMonthTitleBorderBottomColor};
      font-weight: bold;
      margin-bottom: 10px;
      position: relative;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
