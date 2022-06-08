import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  wrapper() {
    return css`
      &:not(:first-child) {
        margin-top: 20px;
      }
    `;
  },
  componentName() {
    return css`
      font-weight: 700;
      font-size: 1.25em;
      margin: 0 5px 5px;
    `;
  },
  row() {
    return css`
      display: flex;
      width: 100%;
      font-size: 16px;
    `;
  },

  leftCell() {
    return css`
      padding: 5px;
      border-right: 1px solid #dadada;
      border-bottom: 1px solid #dadada;
      width: 30%;
      overflow-wrap: anywhere;
    `;
  },
  rightCell() {
    return css`
      padding: 5px;
      border-bottom: 1px solid #dadada;
      width: 70%;
    `;
  },
});
