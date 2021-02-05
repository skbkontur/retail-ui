import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      border: 1px dashed rgba(0, 0, 0, 0.37);
      box-sizing: padding-box;
      border-radius: 1px;
      outline: none;
      height: 32px;
      width: 362px;
      cursor: pointer;
      padding: 0 6px;

      &:focus {
        border: 2px solid #1D85D0;
      }
    `;
  },

  dragOver() {
    return css`
      border: 4px solid #2DA4F9;
      border-radius: 2px;
      box-shadow: 0px 0px 1px 4px rgba(45,164,249,0.35);
    `;
  },

  fileInput() {
    return css`
      display: none;
    `;
  },

  link() {
    return css`
      font-size: 14px;
    `;
  }
};

export const jsStyles = memoizeStyle(styles);
