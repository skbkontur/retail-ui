import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  wrapper() {
    return css`
      overflow: hidden;
      position: absolute;
      pointer-events: none;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
