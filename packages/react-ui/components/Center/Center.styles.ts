import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  root() {
    return css`
      height: 100%;
      text-align: center;
    `;
  },

  rootAlignLeft() {
    return css`
      text-align: left;
    `;
  },

  rootAlignRight() {
    return css`
      text-align: right;
    `;
  },

  spring() {
    return css`
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    `;
  },

  container() {
    return css`
      display: inline-block;
      text-align: left;
      vertical-align: middle;
    `;
  },
});
