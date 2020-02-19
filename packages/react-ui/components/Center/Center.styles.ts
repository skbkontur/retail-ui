import { css } from '../../lib/theming/Emotion';

export const jsStyles = {
  root() {
    return css`
      height: 100%;
    `;
  },

  spring() {
    return css`
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    `;
  },

  container() {
    return css`
      display: inline-block;
      text-align: left;
      vertical-align: middle;
    `;
  },
};
