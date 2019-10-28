import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  headerSticky(t: ITheme) {
    return css`
      background-color: ${t.calendarMonthHeaderStickedBgColor};
    `;
  },

  monthTitle(t: ITheme) {
    return css`
      border-bottom: 1px solid ${t.calendarMonthTitleBorderBottomColor};
    `;
  },
};

export default jsStyles;
