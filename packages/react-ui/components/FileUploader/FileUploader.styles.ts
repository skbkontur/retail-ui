import { css, keyframes, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  pulse() {
    return keyframes`
        0% {
          box-shadow:
            0px 0px 0px 0px #2DA4F9,
            0px 0px 0px 1px rgba(45,164,249,0.7);
        }
        95% {
          box-shadow:
            0px 0px 0px 0px #2DA4F9,
            0px 0px 0px 10px rgba(45,164,249,0);
        }
        100% {
          box-shadow:
            0px 0px 0px 0px #2DA4F9,
            0px 0px 0px 1px rgba(45,164,249,0);
        }
      `;
  },

  root(t: Theme) {
    return css`
      display: inline-block;
      min-width: 285px;
      position: relative;
      background-color: ${t.fileUploaderBg};
      line-height: ${t.fileUploaderLineHeight};
      font-size: ${t.fileUploaderFontSize};
      color: ${t.fileUploaderTextColorDefault};
    `;
  },

  uploadButton(t: Theme) {
    return css`
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      border: ${t.fileUploaderBorderWidth} ${t.fileUploaderBorderStyle} ${t.fileUploaderBorderColor};
      box-sizing: border-box;
      border-radius: ${t.fileUploaderBorderRadius};
      outline: none;
      cursor: pointer;
      padding: ${t.fileUploaderPaddingY} ${t.fileUploaderPaddingX};
      transition: box-shadow 0.3s ease;
    `;
  },

  uploadButtonFocus(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorFocus};
      box-shadow: 0px 0px 0px 1px ${t.fileUploaderBorderColorFocus};
    `;
  },

  dragOver() {
    return css`
      border: 1px solid #2da4f9;
      border-radius: 2px;
      box-shadow: 0px 0px 0px 3px #2da4f9, 0px 0px 0px 8px rgba(45, 164, 249, 0.35);
    `;
  },

  windowDragOver() {
    return css`
      border-radius: 2px;
      animation: ${styles.pulse()} 1.5s infinite;
    `;
  },

  content() {
    return css`
      display: flex;
      width: 100%;
      align-items: center;
      height: 100%;
    `;
  },

  fileInput() {
    return css`
      width: 0;
      height: 0;
    `;
  },

  afterLinkText() {
    return css`
      display: flex;
      justify-content: space-between;
      flex: 1 1 auto;
    `;
  },

  warning(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorWarning};
      box-shadow: 0px 0px 0px 1px ${t.fileUploaderBorderColorWarning};
    `;
  },

  error(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorError};
      box-shadow: 0px 0px 0px 1px ${t.fileUploaderBorderColorError};
    `;
  },

  disabled(t: Theme) {
    return css`
      cursor: default;
      background: ${t.fileUploaderDisabledBg};
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderDisabledBorderColor};
      color: ${t.fileUploaderDisabledTextColor};
      box-shadow: none;
    `;
  },

  icon(t: Theme) {
    return css`
      display: inline-block;
      font-size: ${t.fileUploaderIconSize};
      color: ${t.fileUploaderIconColor};
    `;
  },

  iconDisabled(t: Theme) {
    return css`
      color: ${t.fileUploaderDisabledIconColor};
    `;
  },

  link(t: Theme) {
    return css`
      color: ${t.fileUploaderLinkColor};
    `;
  },

  linkDisabled(t: Theme) {
    return css`
      color: ${t.fileUploaderDisabledLinkColor};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
