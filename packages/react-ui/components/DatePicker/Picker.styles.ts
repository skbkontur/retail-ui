import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      background: ${t.pickerBg};
      box-shadow: ${t.pickerShadow};
      display: inline-block;
      font-size: 0;
      z-index: 1000;
      touch-action: none;
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

  inputTypeDate() {
    return css`
      width: 0px;
      height: 0px;
      visibility: hidden;
      padding: 0px;
      margin: 0px;
      line-height: 0px;
      border: none;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
