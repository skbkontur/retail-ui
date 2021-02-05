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
      max-width: 100%;
      flex: 1 1 100%;
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
    `;
  }
};

export const jsStyles = memoizeStyle(styles);
