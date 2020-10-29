import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  container() {
    return css`
      position: relative;
    `;
  },
  char() {
    return css`
      position: absolute;
      width: 100%;
      text-align: center;
    `;
  },
  charLowLine() {
    return css`
      position: absolute;
      width: calc(100% - 0.1em);
      height: 1px;
      left: 0.05em;
      bottom: 0.11em;
      border-bottom: solid 0.05em;
    `;
  },
  charExemplar() {
    return css`
      color: transparent;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
