import { css, memoizeStyle } from '../theming/Emotion';

export const styles = memoizeStyle({
  row() {
    return css`
      display: flex;
      width: 100%;
    `;
  },
  leftCell() {
    return css`
      border: 1px solid #000;
      width: 30%;
    `;
  },
  rightCell() {
    return css`
      border: 1px solid #000;
      width: 70%;
    `;
  },
  dataTidContainer() {
    return css`
      display: flex;
      width: 100%;
    `;
  },
  dataTidName() {
    return css`
      width: 40%;
      overflow-wrap: anywhere;
    `;
  },
  dataTidDescription() {
    return css`
      width: 60%;
      background: #dddddd;
      padding-left: 10px;
      overflow-wrap: anywhere;
    `;
  },
});
