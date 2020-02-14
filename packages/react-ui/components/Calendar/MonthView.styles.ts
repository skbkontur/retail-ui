import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  headerSticky(t: Theme) {
    return css`
      background-color: ${t.calendarMonthHeaderStickedBgColor};
    `;
  },

  monthTitle(t: Theme) {
    return css`
      border-bottom: 1px solid ${t.calendarMonthTitleBorderBottomColor};
    `;
  },
};
