import { css, memoizeStyle } from '../theming/Emotion';

export const styles = memoizeStyle({
  row() {
    return css`
      display: flex;
      width: 100%;
    `;
  },
  headRow() {
    return css`
      margin-top: 20px;
      font-size: 1.5em;
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
