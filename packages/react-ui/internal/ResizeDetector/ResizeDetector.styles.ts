import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      position: relative;
      height: 100%;
      width: 100%;
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

  fullHeight() {
    return css`
      height: 100%;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
