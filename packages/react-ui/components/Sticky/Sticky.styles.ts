import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  wrapper() {
    return css`
      display: flex;
    `;
  },
  inner() {
    return css`
      display: flex;
      width: 100%;
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
