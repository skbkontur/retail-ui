import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: inline-block;
      position: relative;
    `;
  },

  spinnerWrapper() {
    return css`
      display: inline-block;
      margin-right: -5px;
    `;
  },

  arrowWrapper() {
    return css`
      display: inline-block;
      margin-right: -3px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
