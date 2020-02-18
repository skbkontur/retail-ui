import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
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
      border-top: ${t.pickerTodayWrapperBorderTop};
      border: none;
      color: ${t.linkColor};
      display: block;
      font-size: 14px;
      padding-bottom: 8px;
      padding-top: 7px;
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
};
