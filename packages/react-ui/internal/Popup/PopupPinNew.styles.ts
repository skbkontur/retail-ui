import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  pin() {
    return css`
      position: absolute;
    `;
  },

  pinTop() {
    return css`
      clip-path: polygon(0 0, 50% 100%, 100% 0);
    `;
  },

  pinBottom() {
    return css`
      clip-path: polygon(0 100%, 50% 0, 100% 100%);
    `;
  },

  pinLeft() {
    return css`
      clip-path: polygon(0 0, 100% 50%, 0 100%);
    `;
  },

  pinRight() {
    return css`
      clip-path: polygon(100% 0, 0 50%, 100% 100%);
    `;
  },
});
