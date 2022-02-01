import { css, memoizeStyle } from '../../../lib/theming/Emotion';

export const resetStyles = memoizeStyle({
  button() {
    return css`
      background: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    `;
  },
});
