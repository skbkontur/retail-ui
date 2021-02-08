import { css, memoizeStyle } from '../../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: flex;
      align-items: center;
      height: 32px;
      width: 362px;
      padding: 0 6px;
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
