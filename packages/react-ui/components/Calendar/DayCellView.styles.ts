import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

const styles = {
  cell(t: Theme) {
    return css`
      ${resetButton()};

      background: ${t.calendarCellBg};
      border: 1px solid transparent;
      display: inline-block;
      font-size: 14px;
      padding: 0;
      text-align: center;
      user-select: none;

      &:hover {
        background-color: ${t.calendarCellHoverBgColor};
        color: ${t.calendarCellHoverColor};
        cursor: pointer;
      }
      &:disabled {
        opacity: 0.5;
        pointer-events: none;
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

export const jsStyles = memoizeStyle(styles);
