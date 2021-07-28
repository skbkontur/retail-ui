import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      background: ${t.pickerBg};
      box-shadow: ${t.pickerShadow};
      display: inline-block;
      font-size: 0;
      z-index: 1000;
    `;
  },

  todayWrapper(t: Theme) {
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
