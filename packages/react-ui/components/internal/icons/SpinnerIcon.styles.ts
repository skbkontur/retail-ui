import { css } from '../../../lib/theming/Emotion';

export const jsStyles = {
  root() {
    return css`
      display: inline-block;
      margin-left: -1px;
      margin-right: -1px;
    `;
  },

  icon() {
    return css`
      margin-bottom: -3px;
    `;
  },
};
