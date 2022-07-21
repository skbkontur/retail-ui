import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

const styles = {
  root() {
    return css`
      width: 100%;
    `;
  },

  content(t: Theme) {
    return css`
      display: flex;
      width: 100%;
      align-items: center;
    `;
  },

  contentError(t: Theme) {
    return css`
      color: ${t.fileUploaderLinkColor};
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
      margin-left: 4px;
      flex: 1 0 auto;
      cursor: pointer;
      font-size: ${t.fileUploaderIconSize};
      text-align: right;
      outline: none;
      color: ${t.fileUploaderLinkColor};

      position: absolute;
      right: ${t.fileUploaderPaddingX};
    `;
  },

  iconSmall(t: Theme) {
    return css`
      right: ${t.fileUploaderPaddingXSmall};
      margin-right: ${t.fileUploaderPaddingXSmall};
    `;
  },

  iconMedium(t: Theme) {
    return css`
      right: ${t.fileUploaderPaddingXMedium};
      margin-right: ${t.fileUploaderPaddingXMedium};
    `;
  },

  iconLarge(t: Theme) {
    return css`
      right: ${t.fileUploaderPaddingXLarge};
      margin-right: ${t.fileUploaderPaddingXLarge};
    `;
  },

  iconMultiple(t: Theme) {
    return css`
      position: static;
    `;
  },

  iconSingle(t: Theme) {
    return css`
      margin-right: ${t.btnIconGapMedium};
    `;
  },

  contentSmall(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeSmall};
    `;
  },

  contentMedium(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeMedium};
    `;
  },

  contentLarge(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeLarge};
    `;
  },

  deleteIcon(t: Theme) {
    return css`
      color: ${t.fileUploaderLinkColor};
    `;
  },

  focusedIcon(t: Theme) {
    return css`
      outline: 1px solid ${t.borderColorFocus};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
