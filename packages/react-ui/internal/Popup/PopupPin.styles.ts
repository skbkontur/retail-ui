import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  wrapper() {
    return css`
      overflow: hidden;
      position: absolute;
      pointer-events: none;
    `;
  },
});
