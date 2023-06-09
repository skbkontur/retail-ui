import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  root() {
    return css`
      display: inline-block;
      position: relative;
      touch-action: none;
      line-height: normal;
    `;
  },
  calendarWrapper(t: Theme) {
    return css`
      background: ${t.pickerBg};
      box-shadow: ${t.pickerShadow};
      display: inline-block;
      font-size: 0;
      z-index: 1000;
      touch-action: none;
      border-radius: ${t.pickerBorderRadius};
    `;
  },
  todayLinkWrapper(t: Theme) {
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
      width: 100%;

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
