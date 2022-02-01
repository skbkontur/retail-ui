import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  alignRight() {
    return css`
      display: flex;
      flex-direction: row-reverse;
    `;
  },
});
