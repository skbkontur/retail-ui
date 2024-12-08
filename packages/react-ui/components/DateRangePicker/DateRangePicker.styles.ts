import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root() {
    return css``;
  },

  rootMobile() {
    return css``;
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
});
