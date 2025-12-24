import { css, keyframes, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

import { fileUploaderSizeMixin } from './FileUploader.mixins';

export const globalClasses = prefix('file-uploader')({
  afterLinkText: 'after-link-text',
});

const styles = {
  calcPulse(t: Theme) {
    return keyframes`
      0% {
        box-shadow: 0 0 0 1px ${t.inputBlinkColor};
      }
      95% {
        box-shadow: 0 0 0 10px ${t.inputBlinkColor};
      }
      100% {
        box-shadow: 0 0 0 1px ${t.inputBlinkColor};
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

  root5_5() {
    return css`
      display: inline-flex;
      flex-wrap: wrap;
    `;
  },

  uploadButton(t: Theme) {
    return css`
      width: 100%;
      position: relative;
      display: inline-flex;
      align-items: center;
      border: ${t.fileUploaderBorderWidth} ${t.fileUploaderBorderStyle} ${t.fileUploaderBorderColor};
      box-sizing: border-box;
      border-radius: ${t.fileUploaderBorderRadius};
      outline: none;
      cursor: pointer;
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

  uploadButtonWithFile(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid transparent;
      background: none;
    `;
  },

  uploadButtonIconGapSmall(t: Theme) {
    return css`
      margin-right: ${t.inputIconGapSmall};
    `;
  },

  uploadButtonIconGapMedium(t: Theme) {
    return css`
      margin-right: ${t.inputIconGapMedium};
    `;
  },

  uploadButtonIconGapLarge(t: Theme) {
    return css`
      margin-right: ${t.inputIconGapLarge};
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

  afterLinkText() {
    return css`
      display: inline;
    `;
  },

  afterLinkTextColor(t: Theme) {
    return css`
      color: ${t.fileUploaderAfterLinkColor};
    `;
  },

  afterLinkText_HasFiles() {
    return css`
      display: flex;
      justify-content: space-between;
      flex: 1 1 auto;
      height: 100%;
    `;
  },

  warningButton(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorWarning};
      box-shadow: 0px 0px 0px 1px ${t.fileUploaderBorderColorWarning};
    `;
  },

  warningFile(t: Theme) {
    return css`
      background: ${t.fileUploaderWarningBgColor};
      color: ${t.fileUploaderValidationTextColor};
      &:hover {
        background: ${t.fileUploaderWarningBgHoverColor};
      }
    `;
  },

  errorButton(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorError};
      box-shadow: 0px 0px 0px 1px ${t.fileUploaderBorderColorError};
    `;
  },

  errorFile(t: Theme) {
    return css`
      background: ${t.fileUploaderErrorBgColor};
      color: ${t.fileUploaderValidationTextColor};
      &:hover {
        background: ${t.fileUploaderErrorBgHoverColor};
      }
    `;
  },

  hovered(t: Theme) {
    return css`
      background: ${t.fileUploaderHoveredBg};
    `;
  },

  hoveredBorderColor(t: Theme) {
    return css`
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
      color: ${t.fileUploaderDisabledTextColor};
      box-shadow: none;
      background-clip: ${t.fileUploaderDisabledBgClip};

      .${globalClasses.afterLinkText} {
        color: ${t.fileUploaderDisabledTextColor};
      }
    `;
  },

  disabledBackground(t: Theme) {
    return css`
      background: ${t.fileUploaderDisabledBg};
      border: ${t.fileUploaderDisabledBorder};
    `;
  },

  icon(t: Theme) {
    return css`
      display: inline-block;
      color: ${t.fileUploaderIconColor};
    `;
  },

  iconRight() {
    return css`
      position: absolute;
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
      height: inherit;
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

  iconSmall5_5(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeSmall};
      line-height: ${t.fileUploaderLineHeightSmall};
    `;
  },

  iconMedium5_5(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeMedium};
      line-height: ${t.fileUploaderLineHeightMedium};
    `;
  },

  iconLarge5_5(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeLarge};
      line-height: ${t.fileUploaderLineHeightLarge};
    `;
  },
};

const rowStyles = {
  root() {
    return css`
      width: 100%;
    `;
  },

  uploadButtonWithFile(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid transparent;
      background: none;
    `;
  },

  uploadButton() {
    return css`
      justify-content: space-between;
    `;
  },

  uploadButtonWrapper() {
    return css`
      height: inherit;
      width: 100%;
    `;
  },

  uploadButtonIconGapSmall(t: Theme) {
    return css`
      margin-right: ${t.inputIconGapSmall};
    `;
  },

  uploadButtonIconGapMedium(t: Theme) {
    return css`
      margin-right: ${t.inputIconGapMedium};
    `;
  },

  uploadButtonIconGapLarge(t: Theme) {
    return css`
      margin-right: ${t.inputIconGapLarge};
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
};

const tileStyles = {
  uploadButton() {
    return css`
      height: 100%;
      justify-content: center;
      flex-direction: column;
    `;
  },

  uploadButtonWrapper() {
    return css`
      box-sizing: border-box;
    `;
  },

  uploadButtonWrapperSmall(t: Theme) {
    return css`
      width: ${t.fileUploaderTileWidthSmall};
      min-height: ${t.fileUploaderTileMinHeightSmall};
      height: auto;
    `;
  },

  uploadButtonWrapperMedium(t: Theme) {
    return css`
      width: ${t.fileUploaderTileWidthMedium};
      min-height: ${t.fileUploaderTileMinHeightMedium};
      height: auto;
    `;
  },

  uploadButtonWrapperLarge(t: Theme) {
    return css`
      width: ${t.fileUploaderTileWidthLarge};
      min-height: ${t.fileUploaderTileMinHeightLarge};
      height: auto;
    `;
  },

  uploadButtonWrapperEmptyFileSmall(t: Theme) {
    return css`
      padding: ${t.fileUploaderTileFilePaddingSmall};
      height: ${t.fileUploaderTileMinHeightSmall};
    `;
  },

  uploadButtonWrapperEmptyFileMedium(t: Theme) {
    return css`
      padding: ${t.fileUploaderTileFilePaddingMedium};
      height: ${t.fileUploaderTileMinHeightMedium};
    `;
  },

  uploadButtonWrapperEmptyFileLarge(t: Theme) {
    return css`
      padding: ${t.fileUploaderTileFilePaddingLarge};
      height: ${t.fileUploaderTileMinHeightLarge};
    `;
  },

  uploadButtonWithFile(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid transparent;
      background: none;
      justify-content: start;
    `;
  },

  uploadButtonIconGapSmall(t: Theme) {
    return css`
      margin-bottom: ${t.inputIconGapSmall};
    `;
  },

  uploadButtonIconGapMedium(t: Theme) {
    return css`
      margin-bottom: ${t.inputIconGapMedium};
    `;
  },

  uploadButtonIconGapLarge(t: Theme) {
    return css`
      margin-bottom: ${t.inputIconGapLarge};
    `;
  },

  uploadButtonTileWithFileSmall(t: Theme) {
    return css`
      padding: ${t.fileUploaderTileFilePaddingSmall};
    `;
  },

  uploadButtonTileWithFileMedium(t: Theme) {
    return css`
      padding: ${t.fileUploaderTileFilePaddingMedium};
    `;
  },

  uploadButtonTileWithFileLarge(t: Theme) {
    return css`
      padding: ${t.fileUploaderTileFilePaddingLarge};
    `;
  },

  sizeSmall(t: Theme) {
    return css`
      ${fileUploaderSizeMixin(
        t.fileUploaderFontSizeSmall,
        t.fileUploaderLineHeightSmall,
        t.fileUploaderTilePaddingSmall,
        t.fileUploaderTilePaddingSmall,
      )};
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      ${fileUploaderSizeMixin(
        t.fileUploaderFontSizeMedium,
        t.fileUploaderLineHeightMedium,
        t.fileUploaderTilePaddingMedium,
        t.fileUploaderTilePaddingMedium,
      )};
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      ${fileUploaderSizeMixin(
        t.fileUploaderFontSizeLarge,
        t.fileUploaderLineHeightLarge,
        t.fileUploaderTilePaddingLarge,
        t.fileUploaderTilePaddingLarge,
      )};
    `;
  },

  content() {
    return css`
      display: block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      text-align: center;
    `;
  },

  contentWithFiles() {
    return css`
      display: flex;
      align-items: flex-start;
      height: 100%;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
export const jsRowStyles = memoizeStyle(rowStyles);
export const jsTileStyles = memoizeStyle(tileStyles);
