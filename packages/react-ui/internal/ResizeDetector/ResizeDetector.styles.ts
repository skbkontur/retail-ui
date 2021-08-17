import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
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
      opacity: 0;
    `;
  },

  content() {
    return css`
      position: relative;
    `;
  },
});
