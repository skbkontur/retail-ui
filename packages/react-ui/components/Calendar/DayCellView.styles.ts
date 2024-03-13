import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const globalClasses = prefix('day-cell-view')({
  todayCaption: 'today-caption',
});

export const styles = memoizeStyle({
  baseCell(t: Theme) {
    return css`
      flex: 1 1 ${t.calendarCellWidth};
      height: ${t.calendarCellHeight};
    `;
  },
  dayCell(t: Theme) {
    return css`
      ${resetButton()};

      background: ${t.calendarCellBg};
      border: 1px solid transparent;
      font-size: ${t.calendarCellFontSize};
      padding: 0;
      text-align: center;
      user-select: none;
      position: relative;
      line-height: ${t.calendarCellLineHeight};
      border-radius: ${t.calendarCellBorderRadius};

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

  today2022(t: Theme) {
    return css`
      .${globalClasses.todayCaption} {
        border-bottom: ${t.calendarCellTodayBorder};
      }
    `;
  },

  todayCaption() {
    return css`
      padding-bottom: 2px;
    `;
  },
});
