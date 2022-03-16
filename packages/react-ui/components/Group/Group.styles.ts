import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  root() {
    return css`
      display: inline-flex;
      line-height: normal;
    `;
  },

  fixed() {
    return css`
      flex-shrink: 0;
      display: inline-block;
    `;
  },

  stretch() {
    return css`
      flex-grow: 1;
      flex-shrink: 1;
    `;
  },

  stretchFallback() {
    return css`
      flex-basis: 100%;
    `;
  },

  item() {
    return css`
      margin-left: -1px;
    `;
  },

  itemFirst() {
    return css`
      margin-left: 0;
    `;
  },
});
