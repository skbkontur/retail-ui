import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  caption() {
    return css`
      display: inline-block;
      width: 100%;
    `;
  },
  container() {
    return css`
      display: inline-block;
      line-height: normal;
    `;
  },
});
