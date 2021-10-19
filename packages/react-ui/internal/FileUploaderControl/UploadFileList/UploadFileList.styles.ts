import { css, memoizeStyle } from '../../../lib/theming/Emotion';

const styles = {
  fileWrapper() {
    return css`
      width: 100%;
      padding: 0 12px 0 7px;
      box-sizing: border-box;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
