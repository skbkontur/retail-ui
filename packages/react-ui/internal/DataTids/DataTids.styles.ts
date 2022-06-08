import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  row() {
    return css`
      display: flex;
      width: 100%;
      font-size: 16px;
    `;
  },
  headRow() {
    return css`
      margin-top: 20px;
      font-size: 1.5rem;
      font-weight: bold;
      border-top: 1px solid #000;
    `;
  },
  leftCell() {
    return css`
      padding: 5px;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
      width: 30%;
      overflow-wrap: anywhere;
    `;
  },
  rightCell() {
    return css`
      padding: 5px;
      border-bottom: 1px solid #000;
      width: 70%;
    `;
  },
  dataTid() {
    return css`
      padding-bottom: 2px;
    `;
  },
});
