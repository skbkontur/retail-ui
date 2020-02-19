import { css } from '../../lib/theming/Emotion';

export const jsStyles = {
  root() {
    return css`
      display: inline-flex;
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

  wrap() {
    return css`
      /* for .wrap class not to be 'undefined': used in tests */
      visibility: visible;
    `;
  },
};
