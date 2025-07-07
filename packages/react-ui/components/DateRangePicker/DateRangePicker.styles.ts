import type { SizeProp } from '../../lib/types/props';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';
import { CalendarDataTids } from '../Calendar';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      display: inline-flex;
      align-items: center;
      color: ${t.textColorDefault};

      & > * {
        flex: 1 1 50%;
      }
    `;
  },
  inputWrapperWidth(t: Theme) {
    return css`
      min-width: ${parseInt(t.calendarCellWidth) * 7 + parseInt(t.calendarPaddingX) * 2}px;
    `;
  },
  inputWrapperWidthFull() {
    return css`
      width: 100%;
    `;
  },
  inputVisuallyFocus(t: Theme) {
    return css`
      box-shadow: ${t.inputFocusShadow};
    `;
  },
  calendarWrapper(t: Theme) {
    return css`
      box-shadow: ${t.pickerShadow};
      display: inline-block;
      font-size: 0;
      z-index: 1000;
      touch-action: none;
    `;
  },
  calendarWidthAuto() {
    return css`
      width: auto;
    `;
  },
  rangeCalendarDay() {
    return css`
      width: 100%;
      height: 100%;
    `;
  },
  rangeCalendarDayEnd(t: Theme) {
    return css`
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${t.rangeCalendarCellEndBg};
        border-radius: ${t.calendarCellBorderRadius};
      }

      [data-tid=${CalendarDataTids.dayCell}] {
        color: ${t.rangeCalendarCellEndColor};

        @media (hover: hover) {
          &:hover {
            color: ${t.rangeCalendarCellEndColor};
            background: none;
          }
        }
      }
    `;
  },
  rangeCalendarDayInHoveredPeriod(t: Theme) {
    return css`
      background: ${t.rangeCalendarCellBg};
    `;
  },
  rangeCalendarDayHoverInPeriod(t: Theme) {
    return css`
      @media (hover: hover) {
        &:hover [data-tid=${CalendarDataTids.dayCell}] {
          background: ${t.rangeCalendarCellHoverBg};
        }
      }
    `;
  },
  buttonWrap() {
    return css`
      display: flex;
      margin: 8px;

      > * {
        flex-grow: 1;
      }

      > *:not(:first-child) {
        margin-left: 8px;
      }
    `;
  },
});

export function getFontSize(t: Theme, size?: SizeProp) {
  switch (size) {
    case 'large':
      return t.fontSizeLarge;
    case 'medium':
      return t.fontSizeMedium;
    case 'small':
    default:
      return t.fontSizeSmall;
  }
}
