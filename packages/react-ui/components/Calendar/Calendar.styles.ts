import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      box-sizing: content-box;
      color: ${t.textColorDefault};
      display: block;
      padding: 0 15px;
      width: 210px;
    `;
  },

  wrapper() {
    return css`
      font-size: 14px;
      overflow: hidden;
      position: relative;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
