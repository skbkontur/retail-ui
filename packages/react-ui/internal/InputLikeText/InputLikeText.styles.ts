import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
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

  rightSide() {
    return css`
      padding-left: 0;
      visibility: visible;
    `;
  },
});
