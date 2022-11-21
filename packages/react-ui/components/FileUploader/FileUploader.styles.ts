import { css, keyframes, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { fileUploaderSizeMixin } from './FileUploader.mixins';

export const globalClasses = prefix('file-uploader')({
  afterLinkText: 'after-link-text',
});

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
      position: relative;
      background-color: ${t.fileUploaderBg};
      line-height: ${t.fileUploaderLineHeight};
      font-size: ${t.fileUploaderFontSize};
      color: ${t.fileUploaderTextColorDefault};
      position: relative;
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

  dragOver(t: Theme) {
    return css`
      border: 1px solid #2da4f9;
      border-radius: ${t.fileUploaderBorderRadius};
      box-shadow: 0px 0px 0px 3px #2da4f9, 0px 0px 0px 8px rgba(45, 164, 249, 0.35);
    `;
  },

  windowDragOver(t: Theme) {
    return css`
      border-radius: ${t.fileUploaderBorderRadius};
      animation: ${styles.pulse()} 1.5s infinite;
    `;
  },

  content() {
    return css`
      display: block;
      width: 100%;
      height: 100%;

      overflow: hidden;
      text-overflow: ellipsis;
    `;
  },

  contentWithFiles() {
    return css`
      display: flex;
      align-items: center;
    `;
  },

  contentInnerSmall(t: Theme) {
    return css`
      width: calc(100% - ${t.inputIconSizeSmall} - ${t.fileUploaderIconGapSmall});
    `;
  },

  contentInnerMedium(t: Theme) {
    return css`
      width: calc(100% - ${t.inputIconSizeMedium} - ${t.fileUploaderIconGapMedium});
    `;
  },

  contentInnerLarge(t: Theme) {
    return css`
      width: calc(100% - ${t.inputIconSizeLarge} - ${t.fileUploaderIconGapLarge});
    `;
  },

  fileInput() {
    return css`
      width: 0;
      height: 0;
    `;
  },

  afterLinkText(t: Theme) {
    return css`
      display: inline;
      color: ${t.fileUploaderAfterLinkColor};
    `;
  },

  afterLinkText_HasFiles(t: Theme) {
    return css`
      display: flex;
      justify-content: space-between;
      flex: 1 1 auto;
      color: ${t.fileUploaderAfterLinkColor};
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

  hovered(t: Theme) {
    return css`
      background: ${t.fileUploaderHoveredBg};
      border-color: ${t.fileUploaderHoveredBorderColor};
    `;
  },

  linkHovered(t: Theme) {
    return css`
      text-decoration: ${t.fileUploaderLinkHoverTextDecoration};
    `;
  },

  disabled(t: Theme) {
    return css`
      cursor: default;
      background: ${t.fileUploaderDisabledBg};
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderDisabledBorderColor};
      color: ${t.fileUploaderDisabledTextColor};
      box-shadow: none;

      .${globalClasses.afterLinkText} {
        color: ${t.fileUploaderDisabledTextColor};
      }
    `;
  },

  icon(t: Theme) {
    return css`
      display: inline-block;
      position: absolute;
      color: ${t.fileUploaderIconColor};
      text-align: right;
    `;
  },

  iconDisabled(t: Theme) {
    return css`
      color: ${t.fileUploaderDisabledIconColor};
    `;
  },

  link(t: Theme) {
    return css`
      outline: none;
      text-decoration: none;
      color: ${t.fileUploaderLinkColor};
    `;
  },

  linkDisabled(t: Theme) {
    return css`
      color: ${t.fileUploaderDisabledLinkColor};
      &:hover {
        text-decoration: none;
      }
    `;
  },

  singleFile() {
    return css`
      width: 100%;
    `;
  },

  sizeSmall(t: Theme) {
    return css`
      ${fileUploaderSizeMixin(
        t.fileUploaderFontSizeSmall,
        t.fileUploaderLineHeightSmall,
        t.fileUploaderPaddingXSmall,
        t.fileUploaderPaddingYSmall,
      )};
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      ${fileUploaderSizeMixin(
        t.fileUploaderFontSizeMedium,
        t.fileUploaderLineHeightMedium,
        t.fileUploaderPaddingXMedium,
        t.fileUploaderPaddingYMedium,
      )};
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      ${fileUploaderSizeMixin(
        t.fileUploaderFontSizeLarge,
        t.fileUploaderLineHeightLarge,
        t.fileUploaderPaddingXLarge,
        t.fileUploaderPaddingYLarge,
      )};
    `;
  },

  iconSmall(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeSmall};
      line-height: ${t.fileUploaderLineHeightSmall};
      width: ${t.inputIconSizeSmall};
      bottom: ${t.fileUploaderPaddingYSmall};
      right: ${t.fileUploaderPaddingXSmall};
    `;
  },
  iconMedium(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeMedium};
      line-height: ${t.fileUploaderLineHeightMedium};
      width: ${t.inputIconSizeMedium};
      bottom: ${t.fileUploaderPaddingYMedium};
      right: ${t.fileUploaderPaddingXMedium};
    `;
  },
  iconLarge(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeLarge};
      line-height: ${t.fileUploaderLineHeightLarge};
      width: ${t.inputIconSizeLarge};
      bottom: ${t.fileUploaderPaddingYLarge};
      right: ${t.fileUploaderPaddingXLarge};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
