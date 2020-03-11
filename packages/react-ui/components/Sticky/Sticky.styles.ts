import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  inner() {
    return css`
      display: flex;
    `;
  },

  fixed() {
    return css`
      position: fixed;
    `;
  },

  stopped() {
    return css`
      position: relative;
    `;
  },

  container() {
    return css`
      flex: auto;
      width: 100%;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
