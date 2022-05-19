import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  button() {
    return css`
      background: #5d99da;
      &:hover {
        background: greenyellow;
      }
    `;
  },
});
