import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  root() {
    return css`
      display: inline-block;
      position: relative;
      line-height: normal;
    `;
  },

  spinnerWrapper() {
    return css`
      display: inline-block;
      margin-right: -5px;
    `;
  },

  rightIconWrapper() {
    return css`
      display: inline-block;
      margin-right: -3px;
    `;
  },
});
