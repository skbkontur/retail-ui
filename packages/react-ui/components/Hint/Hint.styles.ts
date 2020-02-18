import { css } from '../../lib/theming/Emotion';

export const jsStyles = {
  content() {
    return css`
      box-sizing: border-box;
      color: #fff;
      font-size: 14px;
      max-width: 200px;
      overflow-wrap: break-word;
      padding: 6px 8px;
      word-break: break-word;
      word-wrap: break-word;
    `;
  },

  contentCenter() {
    return css`
    text-align: center;
    `;
  },
};
