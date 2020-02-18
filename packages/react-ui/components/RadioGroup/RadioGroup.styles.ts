import { css } from '../../lib/theming/Emotion';

export const jsStyles = {
  root() {
    return css`
      display: inline-block;
      user-select: none;
      cursor: default;
    `;
  },

  item() {
    return css`
      display: table;
      margin-top: 10px;
      width: 100%;
    `;
  },

  itemFirst() {
    return css`
      margin-top: 0;
    `;
  },

  itemInline() {
    return css`
      display: inline-table;
      margin-right: 15px;
      margin-top: 0;
      width: auto;
    `;
  },
};
