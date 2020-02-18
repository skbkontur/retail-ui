import { css } from '../../lib/theming/Emotion';

export const jsStyles = {
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
