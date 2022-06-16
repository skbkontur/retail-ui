import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

const styles = {
  root() {
    return css`
      width: 100%;
    `;
  },

  content() {
    return css`
      display: flex;
      width: 100%;
      align-items: center;
      position: relative;
    `;
  },

  error(t: Theme) {
    return css`
      color: ${t.fileUploaderBorderColorError};
    `;
  },

  name() {
    return css`
      flex: 1 1 100%;
      overflow: hidden;
    `;
  },

  size() {
    return css`
      margin-left: 28px;
      flex: 1 0 auto;
    `;
  },

  icon(t: Theme) {
    return css`
      width: 16px;
      margin-left: 23px;
      flex: 1 0 auto;
      cursor: pointer;
      font-size: ${t.fileUploaderIconSize};
      text-align: right;
      outline: none;
    `;
  },

  deleteIcon(t: Theme) {
    return css`
      color: ${t.fileUploaderIconColor};
      &:hover {
        color: ${t.fileUploaderIconHoverColor};
      }
    `;
  },

  focusedIcon(t: Theme) {
    return css`
      outline: 1px solid ${t.borderColorFocus};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
