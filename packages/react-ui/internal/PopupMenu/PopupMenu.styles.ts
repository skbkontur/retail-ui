import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  caption() {
    return css`
      display: inline-block;
      width: 100%;
    `;
  },
  container() {
    return css`
      display: inline-block;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
