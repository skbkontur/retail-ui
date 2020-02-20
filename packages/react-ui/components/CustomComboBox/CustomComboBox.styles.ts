import { css } from '../../lib/theming/Emotion';

export const jsStyles = {
  root() {
    return css`
      display: inline-block;
      position: relative;
    `;
  },

  spinnerWrapper() {
    return css`
      display: inline-block;
      margin-right: -5px;
    `;
  },

  arrowWrapper() {
    return css`
      display: inline-block;
      margin-right: -3px;
    `;
  },
};
