import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
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

export const jsStyles = memoizeStyle(styles);
