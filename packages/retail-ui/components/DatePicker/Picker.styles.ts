import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
    return css`
      background: ${t.pickerBg};
      box-shadow: ${t.pickerShadow};
    `;
  },

  todayWrapper(t: ITheme) {
    return css`
      background-color: ${t.pickerTodayWrapperBgColor};
      border-top: ${t.pickerTodayWrapperBorderTop};
      color: ${t.linkColor};

      &:hover {
        background-color: ${t.pickerTodayWrapperHoverBgColor};
      }

      &:active {
        color: ${t.linkActiveColor};
      }
    `;
  },
};

export default jsStyles;
