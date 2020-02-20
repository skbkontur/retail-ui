import { css } from '../../../lib/theming/Emotion';

export const jsStyles = {
  root() {
    return css`
      padding-right: 10px;
    `;
  },

  input() {
    return css`
      position: absolute;
      top: 0;
    `;
  },

  userSelectContain() {
    return css`
      user-select: text;
      -ms-user-select: element;
    `;
  },

  userSelectNone() {
    return css`
      user-select: none;
    `;
  },

  withoutLeftSide() {
    return css`
      padding-left: 10px;
    `;
  },
};
