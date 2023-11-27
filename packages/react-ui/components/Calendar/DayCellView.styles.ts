import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const globalClasses = prefix('day-cell-view')({
  todayCaption: 'today-caption',
});

export const styles = memoizeStyle({
  cell(t: Theme) {
    return css`
      ${resetButton()};

      background: ${t.calendarCellBg};
      display: inline-block;
      font-size: ${t.calendarCellFontSize};
      padding: 0;
      text-align: center;
      user-select: none;
      position: relative;
      cursor: pointer;

      width: ${t.calendarCellWidth};
      height: ${t.calendarCellHeight};
      line-height: ${t.calendarCellLineHeight};
      flex: 1 1;

      &:disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      > * {
        pointer-events: none;
      }
    `;
  },

  element(t: Theme) {
    return css`
      border-radius: ${t.calendarCellBorderRadius};
      border: 1px solid transparent;

      &:active:hover:enabled {
        color: ${t.calendarCellActiveHoverColor};
      }
    `;
  },

  elementHover(t: Theme) {
    return css`
      background-color: ${t.calendarCellHoverBgColor};
      color: ${t.calendarCellHoverColor};
      cursor: pointer;
    `;
  },

  selected(t: Theme) {
    return css`
      background-color: ${t.calendarCellSelectedBgColor};
      color: ${t.calendarCellSelectedFontColor};
    `;
  },

  period(t: Theme) {
    return css`
      background-color: ${t.calendarCellSelectedBgColor};
    `;
  },

  periodStart() {
    return css`
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    `;
  },

  periodEnd() {
    return css`
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
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
