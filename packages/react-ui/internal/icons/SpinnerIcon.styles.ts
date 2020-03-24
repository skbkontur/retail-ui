import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: inline-block;
      margin-left: -1px;
      margin-right: -1px;
    `;
  },

  icon() {
    return css`
      margin-bottom: -3px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
