import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  calendarRoot() {
    return css`
      width: auto;
    `;
  },
});
