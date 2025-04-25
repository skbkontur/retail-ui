import { css, keyframes, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

import { fileUploaderSizeMixin } from './FileUploader.mixins';

export const globalClasses = prefix('file-uploader')({
  afterLinkText: 'after-link-text',
});

const styles = {
  calcPulse(t: Theme) {
    return keyframes`
      0% {
        box-shadow: 0 0 0 1px ${ColorFunctions.fade(t.inputBlinkColor, 0.6)};
      }
      95% {
        box-shadow: 0 0 0 10px ${ColorFunctions.fade(t.inputBlinkColor, 0.1)};
      }
      100% {
        box-shadow: 0 0 0 1px ${ColorFunctions.fade(t.inputBlinkColor, 0.0)};
      }
    `;
  },

  root(t: Theme) {
    return css`
      display: inline-block;
      position: relative;
      line-height: ${t.fileUploaderLineHeightSmall};
      font-size: ${t.fileUploaderFontSizeSmall};
      color: ${t.fileUploaderTextColorDefault};
      background-color: ${t.fileUploaderBg};
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
      padding: ${t.fileUploaderPaddingYSmall} ${t.fileUploaderPaddingXSmall};
      transition:
        background-color ${t.transitionDuration} ${t.transitionTimingFunction},
        border-color ${t.transitionDuration} ${t.transitionTimingFunction};
      background-color: ${t.fileUploaderUploadButtonBg};
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
      border: 1px solid ${t.fileUploaderDragOverBorderColor};
      border-radius: ${t.fileUploaderBorderRadius};
      box-shadow: ${t.fileUploaderDragOverShadow};
    `;
  },

  windowDragOver(t: Theme) {
    return css`
      border-radius: ${t.fileUploaderBorderRadius};
      animation: ${styles.calcPulse(t)} 1.5s infinite;
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

  visuallyHidden() {
    return css`
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;
      white-space: nowrap;
      clip-path: inset(100%);
      clip: rect(0 0 0 0);
      overflow: hidden;
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
      border: ${t.fileUploaderDisabledBorder};
      color: ${t.fileUploaderDisabledTextColor};
      box-shadow: none;
      background-clip: ${t.fileUploaderDisabledBgClip};

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
