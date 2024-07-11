import { css, memoizeStyle } from '../../../lib/theming/Emotion';

export const styles = memoizeStyle({
  input() {
    return css`
      display: inline-block;
      background-color: transparent;
      background-size: 100%;
      background-repeat: repeat;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    `;
  },
});
