import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const jsStyles = {
  cell(t: Theme) {
    return css`
      ${resetButton()};

      text-align: center;
      background: ${t.calendarCellBg};
      border: 1px solid transparent;

      &:hover {
        background-color: ${t.calendarCellHoverBgColor};
        color: ${t.calendarCellHoverColor};
      }
      &:active:hover {
        color: ${t.calendarCellActiveHoverColor};
      }
    `;
  },

  selected(t: Theme) {
    return css`
      background-color: ${t.calendarCellSelectedBgColor};
      color: ${t.calendarCellSelectedFontColor};
    `;
  },

  weekend(t: Theme) {
    return css`
      color: ${t.calendarCellWeekendColor};
    `;
  },

  today(t: Theme) {
    return css`
      border: ${t.calendarCellTodayBorder};
    `;
  },
};
