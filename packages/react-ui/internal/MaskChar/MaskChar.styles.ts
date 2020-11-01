import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      position: relative;
    `;
  },
  char() {
    return css`
      &:after {
        content: attr(data-char);
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
      }
    `;
  },
  charLowLine() {
    return css`
      &:after {
        content: '';
        position: absolute;
        width: calc(100% - 0.1em);
        height: 1px;
        left: 0.05em;
        bottom: 0.11em;
        border-bottom: solid 0.05em;
      }
    `;
  },
  notFixedWidth() {
    return css`
      &:after {
        position: static !important;
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
