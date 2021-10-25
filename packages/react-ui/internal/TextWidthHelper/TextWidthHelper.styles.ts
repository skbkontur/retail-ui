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
      overflow: hidden;
    `;
  },
  textContainer() {
    return css`
      word-break: break-all;
      white-space: nowrap;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
