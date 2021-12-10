import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  root() {
    return css`
      display: flex;
    `;
  },

  alignRight() {
    return css`
      justify-content: flex-end;
    `;
  },
});
