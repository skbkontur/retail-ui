import { css } from '../../../lib/theming/Emotion';
export const jsStyles = {
  row() {
    return css`
      display: flex;
      align-items: center;
    `;
  },

  label() {
    return css`
      width: 160px;
    `;
  },

  field() {
    return css`
      flex-grow: 2;
    `;
  },
};
