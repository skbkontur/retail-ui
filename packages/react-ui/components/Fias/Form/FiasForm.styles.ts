import { css, memoizeStyle } from '../../../lib/theming/Emotion';

const styles = {
  row() {
    return css`
      display: flex;
      align-items: center;
    `;
  },

  label() {
    return css`
      width: 160px;
    `;
  },

  field() {
    return css`
      flex-grow: 2;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
