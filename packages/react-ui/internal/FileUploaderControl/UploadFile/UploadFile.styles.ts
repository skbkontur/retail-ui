import { css, memoizeStyle } from '../../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: flex;
      width: 100%;
      height: 32px;
      align-items: center;
    `;
  },

  content() {
    return css`
      display: flex;
      width: 100%;
      position: relative;
    `;
  },

  error() {
    return css`
      color: #d70c17;
    `;
  },

  name() {
    return css`
      flex: 1 1 100%;
      overflow: hidden;
    `;
  },

  size() {
    return css`
      margin-left: 28px;
      flex: 1 0 auto;
    `;
  },

  icon() {
    return css`
      margin-left: 23px;
      flex: 1 0 auto;
      cursor: pointer;
      width: 16px;
      height: 16px;
      text-align: right;
    `;
  },

  deleteIcon() {
    return css`
      color: #808080;
      &:hover {
        color: #333;
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
