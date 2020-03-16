import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: inline-block;
      margin: 0 -20px;
      padding: 0;
      position: relative;
    `;
  },

  vertical() {
    return css`
      margin: 0;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
