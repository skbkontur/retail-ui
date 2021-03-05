import { css, memoizeStyle } from '../../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      width: 100%;
    `;
  },

  content() {
    return css`
      display: flex;
      width: 100%;
    `;
  },

  error() {
    return css`
      color: #D70C17;
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
    `;
  }
};

export const jsStyles = memoizeStyle(styles);
