import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      visibility: hidden;
    `;
  },
  textContainer() {
    return css`
      max-width: 100%;
      word-break: break-all;

      // don't collapse spaces
      // so they get counted in width
      white-space: pre-wrap;
    `;
  }
};

export const jsStyles = memoizeStyle(styles);
