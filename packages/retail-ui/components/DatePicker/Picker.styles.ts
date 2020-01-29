import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      background: ${t.pickerBg};
      box-shadow: ${t.pickerShadow};
    `;
  },

  todayWrapper(t: Theme) {
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
