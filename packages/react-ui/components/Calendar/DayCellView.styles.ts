import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
  cell(t: Theme) {
    return css`
      flex: 1 1 ${t.calendarCellWidth};
      height: ${t.calendarCellHeight};
    `;
  },
  day(t: Theme) {
    return css`
      ${resetButton()};
      width: 100%;
      height: 100%;

      background: ${t.calendarCellBg};
      border: 1px solid transparent;
      font-size: ${t.calendarCellFontSize};
      padding: 0;
      text-align: center;
      user-select: none;
      position: relative;
      line-height: ${t.calendarCellLineHeight};
      border-radius: ${t.calendarCellBorderRadius};
      transition:
        0.15s ease background-color,
        0.15s ease opacity;

      // Expand the clickable area
      &:before {
        content: '';
        position: absolute;
        left: -1px;
        top: -1px;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
      }

      @media (hover: hover) {
        &:hover {
          background-color: ${t.calendarCellHoverBgColor};
          color: ${t.calendarCellHoverColor};
          cursor: pointer;
        }
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

  todayCaption(t: Theme) {
    return css`
      padding-bottom: 2px;
      border-bottom: ${t.calendarCellTodayBorder};
    `;
  },
});
