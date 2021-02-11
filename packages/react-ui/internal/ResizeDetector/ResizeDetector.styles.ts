import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      position: relative;
    `;
  },

  iframe() {
    return css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border: 0;
      background: transparent;
    `;
  },

  content() {
    return css`
      position: relative;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
