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
      background: ${t.calendarBg};
      box-shadow: ${t.pickerShadow};
      display: flex;
      flex-flow: column nowrap;
      font-size: 0;
      z-index: 1000;
      touch-action: none;
      border-radius: ${t.calendarBorderRadius};
    `;
  },
});
