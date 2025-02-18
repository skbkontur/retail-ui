import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  root() {
    return css`
      padding-right: 10px;
    `;
  },

  visuallyHidden() {
    return css`
      position: absolute;
      width: 1px;
      height: 0;
      border: 0;
      outline: 0;
      margin: 0;
      padding: 0;
      overflow: hidden;
      opacity: 0;
    `;
  },

  absolute() {
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
