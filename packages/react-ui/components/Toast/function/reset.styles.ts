import { css, memoizeStyle } from '../../../lib/theming/Emotion';

export const resetStyles = memoizeStyle({
  button() {
    return css`
      background: none;
      border: none;
    `;
  },
});
