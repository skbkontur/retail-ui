import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: inline-flex;
      border: 1px dashed rgba(0, 0, 0, 0.37);
      padding: 5px 6px 7px;
      cursor: pointer;
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
