import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  root() {
    return css`
      padding-right: 10px;
    `;
  },
  rootMultiline() {
    return css`
      align-items: flex-start;
      height: auto;
    `;
  },

  absolute() {
    return css`
      position: absolute;
      top: 0;
    `;
  },

  multiline() {
    return css`
      overflow-wrap: anywhere;
      white-space: normal;
    `;
  },

  wrapperMultiline() {
    return css`
      overflow-wrap: anywhere;
      white-space: normal;
      overflow: visible;
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
