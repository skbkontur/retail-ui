import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      background: ${t.pickerBg};
      display: inline-block;
      font-size: 0;
      z-index: 1000;
      touch-action: none;
    `;
  },
  todayWrapper(t: Theme) {
    const width = parseInt(t.calendarCellSize) * 7 + parseInt(t.calendarPaddingX) * 2;

    return css`
      background-color: ${t.pickerTodayWrapperBgColor};
      border: none;
      border-top: ${t.pickerTodayWrapperBorderTop};
      color: ${t.linkColor};
      display: block;
      font-size: ${t.pickerTodayWrapperFontSize};
      padding-bottom: ${t.pickerTodayWrapperPaddingBottom};
      padding-top: ${t.pickerTodayWrapperPaddingTop};

      line-height: ${t.pickerTodayWrapperLineHeight};
      width: ${width}px;

      &:hover {
        background-color: ${t.pickerTodayWrapperHoverBgColor};
        cursor: pointer;
      }

      &:active {
        color: ${t.linkActiveColor};
      }
    `;
  },
});
