import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import type { Theme } from '../../../lib/theming/Theme';

const styles = {
  fileWrapper(t: Theme) {
    return css`
      position: relative;
      width: 100%;
      height: max-content;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-radius: ${t.fileUploaderBorderRadius};
      border: ${t.fileUploaderBorderWidth} solid transparent;
      box-shadow: 0 0 0 1px transparent;
      cursor: pointer;

      &::before {
        position: absolute;
        content: ' ';
        width: 100%;
        height: 100%;
        border-radius: ${t.fileUploaderBorderRadius};
        border: ${t.fileUploaderBorderWidth} solid transparent;
        box-shadow: 0 0 0 1px transparent;
        top: -1px;
        left: -1px;
        z-index: -1;
      }
    `;
  },

  fileWrapperFocus(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorFocus};
      box-shadow: 0 0 0 1px ${t.fileUploaderBorderColorFocus};
    `;
  },

  fileWrapperHover(t: Theme) {
    return css`
      background: ${t.fileUploaderHoveredBg};
      border-color: ${t.fileUploaderHoveredBorderColor};
    `;
  },

  warningFile(t: Theme) {
    return css`
      background: ${t.fileUploaderWarningBgColor};
      color: ${t.fileUploaderValidationTextColor};
      &:hover {
        background: ${t.fileUploaderWarningBgHoverColor};
        border-radius: ${t.fileUploaderBorderRadius};
      }
      &::before {
        background: ${t.fileUploaderWarningBgColor};
      }
    `;
  },

  errorFile(t: Theme) {
    return css`
      background: ${t.fileUploaderErrorBgColor};
      color: ${t.fileUploaderValidationTextColor};
      &:hover {
        background: ${t.fileUploaderErrorBgHoverColor};
        border-radius: ${t.fileUploaderBorderRadius};
      }
      &::before {
        background: ${t.fileUploaderErrorBgColor};
      }
    `;
  },

  removeBorderTopRadius() {
    return css`
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      &::before {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
      }
    `;
  },

  removeBorderBottomRadius() {
    return css`
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      &::before {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
    `;
  },

  summary(t: Theme) {
    return css`
      display: flex;
      border-bottom: 1px solid ${t.tabColorHover};
      margin-bottom: ${t.fileUploaderListGap};
      order: -1;
      width: 100%;
      box-sizing: border-box;
    `;
  },

  summaryErrorText(t: Theme) {
    return css`
      color: ${t.fileUploaderErrorTextColor};
      margin-right: ${t.fileUploaderListSummaryTextGap};
    `;
  },

  summaryWarningText(t: Theme) {
    return css`
      color: ${t.fileUploaderWarningTextColor};
    `;
  },

  summarySmall(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeSmall};
      line-height: ${t.fileUploaderLineHeightSmall};
      padding: ${t.fileUploaderPaddingYSmall} ${t.fileUploaderPaddingXSmall};
    `;
  },

  summaryMedium(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeMedium};
      line-height: ${t.fileUploaderLineHeightMedium};
      padding: ${t.fileUploaderPaddingYMedium} ${t.fileUploaderPaddingXMedium};
    `;
  },

  summaryLarge(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeLarge};
      line-height: ${t.fileUploaderLineHeightLarge};
      padding: ${t.fileUploaderPaddingYLarge} ${t.fileUploaderPaddingXLarge};
    `;
  },
};

const rowStyles = {
  file() {
    return css`
      width: 100%;
    `;
  },

  fileListWrapper(t: Theme) {
    return css`
      display: block;
      width: 100%;
      margin-top: ${t.fileUploaderListGap};
    `;
  },

  fileWrapperSmall(t: Theme) {
    return css`
      padding: ${t.fileUploaderPaddingYSmall} ${t.fileUploaderPaddingXSmall};
    `;
  },

  fileWrapperMedium(t: Theme) {
    return css`
      padding: ${t.fileUploaderPaddingYMedium} ${t.fileUploaderPaddingXMedium};
    `;
  },

  fileWrapperLarge(t: Theme) {
    return css`
      padding: ${t.fileUploaderPaddingYLarge} ${t.fileUploaderPaddingXLarge};
    `;
  },

  errorFileFocus(t: Theme) {
    return css`
      background: ${t.fileUploaderErrorBgHoverColor};
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorError};
      border-radius: ${t.fileUploaderBorderRadius} !important;
      box-shadow: 0 0 0 1px ${t.fileUploaderBorderColorError};
    `;
  },

  warningFileFocus(t: Theme) {
    return css`
      background: ${t.fileUploaderWarningBgHoverColor};
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorWarning};
      border-radius: ${t.fileUploaderBorderRadius} !important;
      box-shadow: 0 0 0 1px ${t.fileUploaderBorderColorWarning};
    `;
  },
};

const tileStyles = {
  file() {
    return css`
      width: 100%;
      height: 100%;
    `;
  },

  fileListWrapper() {
    return css`
      display: contents;
    `;
  },

  fileWrapperSmall(t: Theme) {
    return css`
      padding: ${t.fileUploaderTileFilePaddingSmall};
      width: ${t.fileUploaderTileWidthSmall};
    `;
  },

  fileWrapperMedium(t: Theme) {
    return css`
      padding: ${t.fileUploaderTileFilePaddingMedium};
      width: ${t.fileUploaderTileWidthMedium};
      height: ${t.fileUploaderTileHeightMedium};
    `;
  },

  fileWrapperLarge(t: Theme) {
    return css`
      padding: ${t.fileUploaderTileFilePaddingLarge};
      width: ${t.fileUploaderTileWidthLarge};
      height: ${t.fileUploaderTileHeightLarge};
    `;
  },

  errorFileFocus(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorError};
      border-radius: ${t.fileUploaderBorderRadius} !important;
      box-shadow: 0 0 0 1px ${t.fileUploaderBorderColorError};
    `;
  },

  warningFileFocus(t: Theme) {
    return css`
      border: ${t.fileUploaderBorderWidth} solid ${t.fileUploaderBorderColorWarning};
      border-radius: ${t.fileUploaderBorderRadius} !important;
      box-shadow: 0 0 0 1px ${t.fileUploaderBorderColorWarning};
    `;
  },
};
export const jsStyles = memoizeStyle(styles);
export const jsRowStyles = memoizeStyle(rowStyles);
export const jsTileStyles = memoizeStyle(tileStyles);
