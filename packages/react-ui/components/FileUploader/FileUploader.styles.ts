import { css, keyframes, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { buttonSizeMixin, buttonSizeMixinIE11 } from '../Button/Button.mixins';

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

  afterLinkText() {
    return css`
      display: inline;
    `;
  },

  afterLinkText_HasFiles() {
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

  hovered(t: Theme) {
    return css`
      background: ${t.fileUploaderHoveredBg};
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
      position: absolute;
      right: ${t.fileUploaderPaddingX};
      bottom: 10px;
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
      ${buttonSizeMixin(
        t.fileUploaderFontSizeSmall,
        t.fileUploaderLineHeightSmall,
        t.fileUploaderPaddingXSmall,
        t.fileUploaderPaddingYSmall,
        t.fontFamilyCompensationBaseline,
      )};
    `;
  },

  sizeSmallIE11(t: Theme) {
    return css`
      ${buttonSizeMixinIE11(
        t.fileUploaderFontSizeSmall,
        t.fileUploaderPaddingXSmall,
        t.fileUploaderPaddingYSmall,
        t.fontFamilyCompensationBaseline,
      )};
      line-height: ${t.fileUploaderLineHeightSmall};
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      ${buttonSizeMixin(
        t.fileUploaderFontSizeMedium,
        t.fileUploaderLineHeightMedium,
        t.fileUploaderPaddingXMedium,
        t.fileUploaderPaddingYMedium,
        t.fontFamilyCompensationBaseline,
      )};
    `;
  },

  sizeMediumIE11(t: Theme) {
    return css`
      ${buttonSizeMixinIE11(
        t.fileUploaderFontSizeMedium,
        t.fileUploaderPaddingXMedium,
        t.fileUploaderPaddingYMedium,
        t.fontFamilyCompensationBaseline,
      )};
      line-height: ${t.fileUploaderLineHeightMedium};
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      ${buttonSizeMixin(
        t.fileUploaderFontSizeLarge,
        t.fileUploaderLineHeightLarge,
        t.fileUploaderPaddingXLarge,
        t.fileUploaderPaddingYLarge,
        t.fontFamilyCompensationBaseline,
      )};
    `;
  },

  sizeLargeIE11(t: Theme) {
    return css`
      ${buttonSizeMixinIE11(
        t.fileUploaderFontSizeLarge,
        t.fileUploaderPaddingXLarge,
        t.fileUploaderPaddingYLarge,
        t.fontFamilyCompensationBaseline,
      )};
      line-height: ${t.fileUploaderLineHeightLarge};
    `;
  },

  iconSmall(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeSmall};
      line-height: ${t.fileUploaderLineHeightSmall};
      width: ${t.inputIconSizeSmall};
      margin-right: 0;
      bottom: ${t.fileUploaderPaddingYSmall};
      right: ${t.fileUploaderPaddingXSmall};
    `;
  },
  iconMedium(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeMedium};
      line-height: ${t.fileUploaderLineHeightMedium};
      width: ${t.inputIconSizeMedium};
      margin-right: 0;
      bottom: ${t.fileUploaderPaddingYMedium};
      right: ${t.fileUploaderPaddingXMedium};
    `;
  },
  iconLarge(t: Theme) {
    return css`
      font-size: ${t.fileUploaderFontSizeLarge};
      line-height: ${t.fileUploaderLineHeightLarge};
      width: ${t.inputIconSizeLarge};
      margin-right: 0;
      bottom: ${t.fileUploaderPaddingYLarge};
      right: ${t.fileUploaderPaddingXLarge};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
