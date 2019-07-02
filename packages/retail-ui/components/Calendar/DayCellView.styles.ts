import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  cell(t: ITheme) {
    return css`
      background: ${t.calendarCellBg};

      &:hover {
        background-color: ${t.calendarCellHoverBgColor};
        color: ${t.calendarCellHoverColor};
      }
      &:active:hover {
        color: ${t.calendarCellActiveHoverColor};
      }
    `;
  },

  selected(t: ITheme) {
    return css`
      background-color: ${t.calendarCellSelectedBgColor};
      color: ${t.calendarCellSelectedFontColor};
    `;
  },

  weekend(t: ITheme) {
    return css`
      color: ${t.calendarCellWeekendColor};
    `;
  },

  today(t: ITheme) {
    return css`
      border: ${t.calendarCellTodayBorder};
    `;
  },
};

export default jsStyles;
