import { css } from '../../lib/theming/Emotion';

export const jsStyles = {
  root() {
    return css`
      display: inline-block;
      margin: 0 -20px;
      padding: 0;
      position: relative;
    `;
  },

  vertical() {
    return css`
      margin: 0;
    `;
  },
};
