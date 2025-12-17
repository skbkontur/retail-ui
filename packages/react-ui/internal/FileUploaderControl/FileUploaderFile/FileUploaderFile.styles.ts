import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import type { Theme } from '../../../lib/theming/Theme';

const styles = {
  root() {
    return css`
      width: 100%;
      height: inherit;
    `;
  },

  content() {
    return css`
      display: flex;
      width: 100%;
      align-items: baseline;
    `;
  },

  error(t: Theme) {
    return css`
      color: ${t.fileUploaderBorderColorError};
    `;
  },

  validationTextError(t: Theme) {
    return css`
      color: ${t.fileUploaderErrorTextColor};
    `;
  },

  validationTextWarning(t: Theme) {
    return css`
      color: ${t.fileUploaderWarningTextColor};
    `;
  },

  nameBlock() {
    return css`
      display: flex;
      flex-wrap: wrap;
      flex: 1 1 100%;
      width: 100%;
    `;
  },

  size(t: Theme) {
    return css`
      margin-left: ${t.fileUploaderFileSizeMarginLeft};
      flex: 1 0 auto;
    `;
  },

  sizeSmall(t: Theme) {
    return css`
      width: ${t.fileUploaderFileSizeWidthSmall};
      margin-right: ${t.fileUploaderFileSizeMarginSmall};
      font-size: ${t.fileUploaderFontSizeSmall};
      line-height: ${t.fileUploaderLineHeightSmall};
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      width: ${t.fileUploaderFileSizeWidthMedium};
      margin-right: ${t.fileUploaderFileSizeMarginMedium};
      font-size: ${t.fileUploaderFontSizeMedium};
      line-height: ${t.fileUploaderLineHeightMedium};
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      width: ${t.fileUploaderFileSizeWidthLarge};
      margin-right: ${t.fileUploaderFileSizeMarginLarge};
      font-size: ${t.fileUploaderFontSizeLarge};
      line-height: ${t.fileUploaderLineHeightLarge};
    `;
  },

  icon(t: Theme) {
    return css`
      width: ${t.fileUploaderTileIconSizeSmall};
      flex: 1 0 auto;
      cursor: pointer;
      text-align: right;
      outline: none;
    `;
  },

  icon5_5(t: Theme) {
    return css`
      text-align: center;
      border-radius: ${t.fileUploaderBorderRadius};
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: ${t.fileUploaderIconGapSmall};
      right: ${t.fileUploaderIconGapSmall};

      &:hover {
        background: ${t.fileUploaderHoveredBg};
      }
      &:active {
        background: ${t.fileUploaderActiveBg};
      }
    `;
  },

  iconMultiple() {
    return css`
      position: static;
    `;
  },

  disabledFileTypeIconSvg(t: Theme) {
    return css`
      svg {
        fill: ${t.fileUploaderDisabledFileTypeIcon} !important;
      }
    `;
  },

  fileTypeIconMultiple() {
    return css`
      margin-left: 0;
    `;
  },

  contentSmall(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeSmall};
      line-height: ${t.fileUploaderLineHeightSmall};
    `;
  },

  contentMedium(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeMedium};
      line-height: ${t.fileUploaderLineHeightMedium};
    `;
  },

  contentLarge(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeLarge};
      line-height: ${t.fileUploaderLineHeightLarge};
    `;
  },
};

const rowStyles = {
  content() {
    return css`
      flex-direction: row;
    `;
  },

  contentSmall(t: Theme) {
    return css`
      margin-right: ${t.fileUploaderFileIconSizeSmall};
    `;
  },

  contentMedium(t: Theme) {
    return css`
      margin-right: ${t.fileUploaderFileIconSizeMedium};
    `;
  },

  contentLarge(t: Theme) {
    return css`
      margin-right: ${t.fileUploaderFileIconSizeMedium};
    `;
  },

  iconSmall(t: Theme) {
    return css`
      height: ${t.fileUploaderFileIconSizeSmall};
      width: ${t.fileUploaderFileIconSizeSmall};
    `;
  },

  iconMedium(t: Theme) {
    return css`
      height: ${t.fileUploaderFileIconSizeMedium};
      width: ${t.fileUploaderFileIconSizeMedium};
    `;
  },

  iconLarge(t: Theme) {
    return css`
      height: ${t.fileUploaderFileIconSizeLarge};
      width: ${t.fileUploaderFileIconSizeLarge};
    `;
  },

  fileTypeIconSmall(t: Theme) {
    return css`
      margin-right: ${t.fileUploaderIconGapSmall};
    `;
  },

  fileTypeIconMedium(t: Theme) {
    return css`
      margin-right: ${t.fileUploaderIconGapMedium};
    `;
  },

  fileTypeIconLarge(t: Theme) {
    return css`
      margin-right: ${t.fileUploaderIconGapLarge};
    `;
  },

  iconColor(t: Theme) {
    return css`
      color: ${t.fileUploaderIconColor};
      &:hover {
        color: ${t.fileUploaderIconHoverColor};
      }
    `;
  },

  size(t: Theme) {
    return css`
      margin-left: ${t.fileUploaderIconGapSmall};
      color: ${t.fileUploaderDisabledColor};
    `;
  },

  name() {
    return css`
      flex: 1 1 100%;
      overflow: hidden;
    `;
  },

  nameBlock() {
    return css`
      flex: 1 1 100%;
    `;
  },

  disabled(t: Theme) {
    return css`
      cursor: default;
      color: ${t.fileUploaderDisabledTextColor};
    `;
  },
};

const tileStyles = {
  content() {
    return css`
      flex-direction: column;
      align-items: center;
      height: inherit;
    `;
  },

  iconAction(t: Theme) {
    return css`
      border-radius: ${t.fileUploaderBorderRadius};
      opacity: 0;
      background: ${t.fileUploaderTileIconColorBg};

      &:hover {
        background: ${t.fileUploaderTileIconHoverColorBg};
      }

      &:active {
        background: ${t.fileUploaderTileIconActiveColorBg};
      }
    `;
  },

  iconActionShow() {
    return css`
      opacity: 1;
    `;
  },

  iconSmall(t: Theme) {
    return css`
      width: ${t.fileUploaderTileIconSizeSmall};
      height: ${t.fileUploaderTileIconSizeSmall};
      padding: ${t.fileUploaderTileIconActionPaddingSmall};
      top: ${t.fileUploaderTileIconActionPositionSmall};
      right: ${t.fileUploaderTileIconActionPositionSmall};
    `;
  },

  iconMedium(t: Theme) {
    return css`
      width: ${t.fileUploaderTileIconSizeMedium};
      height: ${t.fileUploaderTileIconSizeMedium};
      padding: ${t.fileUploaderTileIconActionPaddingMedium};
      top: ${t.fileUploaderTileIconActionPositionMedium};
      right: ${t.fileUploaderTileIconActionPositionMedium};
    `;
  },

  iconLarge(t: Theme) {
    return css`
      width: ${t.fileUploaderTileIconSizeLarge};
      height: ${t.fileUploaderTileIconSizeLarge};
      padding: ${t.fileUploaderTileIconActionPaddingLarge};
      top: ${t.fileUploaderTileIconActionPositionLarge};
      right: ${t.fileUploaderTileIconActionPositionLarge};
    `;
  },

  fileTypeIcon(t: Theme) {
    return css`
      width: 100%;
      border: 1px solid ${t.fileUploaderDisabledBorderColor};
      border-radius: ${t.fileUploaderBorderRadius};
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
  },

  fileTypeIconPreview() {
    return css`
      background-position: top;
      background-size: cover;
      background-repeat: no-repeat;
    `;
  },

  fileTypeIconSmall(t: Theme) {
    return css`
      margin-bottom: ${t.fileUploaderIconGapSmall};
      height: ${t.fileUploaderTileTypeIconHeightSmall};
    `;
  },

  fileTypeIconMedium(t: Theme) {
    return css`
      margin-bottom: ${t.fileUploaderIconGapMedium};
      height: ${t.fileUploaderTileTypeIconHeightMedium};
    `;
  },

  fileTypeIconLarge(t: Theme) {
    return css`
      margin-bottom: ${t.fileUploaderIconGapLarge};
      height: ${t.fileUploaderTileTypeIconHeightLarge};
    `;
  },

  disabledFileTypeIcon(t: Theme) {
    return css`
      box-shadow: none;
      background: ${t.fileUploaderDisabledBg};
    `;
  },

  sizeDisabled(t: Theme) {
    return css`
      color: ${t.fileUploaderDisabledIconColor};
    `;
  },

  errorFileTypeIcon(t: Theme) {
    return css`
      background: ${t.fileUploaderErrorBgColor};
      border: 1px solid ${t.fileUploaderErrorBgColor};
    `;
  },

  warningFileTypeIcon(t: Theme) {
    return css`
      background: ${t.fileUploaderWarningBgColor};
      border: 1px solid ${t.fileUploaderWarningBgColor};
    `;
  },

  iconColor(t: Theme) {
    return css`
      color: ${t.fileUploaderTileIconColor};
      &:hover {
        color: ${t.fileUploaderTileIconHoverColor};
      }
    `;
  },

  size(t: Theme) {
    return css`
      width: 100%;
      margin: ${t.fileUploaderIconGapSmall} 0 0;
      overflow: hidden;
      text-align: center;
      color: ${t.clearCrossIconColor};
    `;
  },

  name() {
    return css`
      flex: 1 1 100%;
      word-break: break-all;
      height: 100%;

      span {
        word-break: break-word;
      }
    `;
  },

  nameBlock() {
    return css`
      flex: 0;
      text-align: center;
    `;
  },

  contentSmall(t: Theme) {
    const maxHeight = parseInt(t.fileUploaderLineHeightSmall) * 2;
    return css`
      max-height: ${maxHeight}px;
    `;
  },

  contentMedium(t: Theme) {
    const maxHeight = parseInt(t.fileUploaderLineHeightMedium) * 2;
    return css`
      max-height: ${maxHeight}px;
    `;
  },

  contentLarge(t: Theme) {
    const maxHeight = parseInt(t.fileUploaderLineHeightLarge) * 2;
    return css`
      max-height: ${maxHeight}px;
    `;
  },

  disabled(t: Theme) {
    return css`
      cursor: default;
      color: ${t.fileUploaderDisabledIconColor};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
export const jsRowStyles = memoizeStyle(rowStyles);
export const jsTileStyles = memoizeStyle(tileStyles);
