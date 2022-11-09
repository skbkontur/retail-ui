import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
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
      position: relative;

      width: ${t.calendarCellSize};
      height: ${t.calendarCellSize};
      line-height: ${t.calendarCellLineHeight};
      border-radius: 50%;

      &:hover {
        background-color: ${t.calendarCellHoverBgColor};
        color: ${t.calendarCellHoverColor};
        cursor: pointer;
      }
      &:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      &:active:hover:enabled {
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
});
