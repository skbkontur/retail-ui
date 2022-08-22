import { css, keyframes, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { shift } from '../../lib/styles/DimensionFunctions';
import { resetText } from '../../lib/styles/Mixins';

const shouldCompensateFontFamily = (fontFamilyCompensation: string): boolean =>
  Boolean(parseInt(fontFamilyCompensation));

export const styles = memoizeStyle({
  wrapper() {
    return css`
      align-items: center;
      display: flex;
      margin: 0;
      min-width: 0;
      overflow: hidden;
      position: relative;
      text-overflow: clip;
      white-space: nowrap;
      width: 100%;

      &::before {
        content: '\\A0';
        display: inline-block;
        width: 0;
      }
    `;
  },

  root(t: Theme) {
    return css`
      ${resetText()};

      align-items: center;
      background-clip: padding-box;
      background-color: ${t.inputBg};
      border: ${t.inputBorderWidth} solid ${t.inputBorderColor};
      border-top-color: ${t.inputBorderTopColor};
      box-shadow: ${t.inputShadow};
      box-sizing: border-box;
      color: ${t.inputColor};
      cursor: text;
      display: inline-flex;
      outline: none;
      position: relative;
      width: ${t.inputWidth};

      & * {
        box-sizing: border-box;
      }
    `;
  },

  borderless() {
    return css`
      box-shadow: none;
      border-color: transparent;
    `;
  },

  useDefaultColor(t: Theme) {
    return css`
      color: ${t.inputIconColor};
    `;
  },

  focus(t: Theme) {
    return css`
      background: ${t.inputFocusedBg};
      border-color: ${t.inputBorderColorFocus};
      box-shadow: ${t.inputFocusShadow};
      outline: none;
      z-index: 2;
    `;
  },

  focusFallback(t: Theme) {
    return css`
      box-shadow: none;
      outline: ${t.inputOutlineWidth} solid ${t.inputFocusOutline};
    `;
  },

  placeholder(t: Theme) {
    return css`
      -ms-user-select: none;
      color: ${t.inputPlaceholderColor};
      cursor: text;
      font-size: inherit;
      height: 100%;
      left: 0;
      overflow: hidden;
      pointer-events: none;
      position: absolute;
      top: 0;
      user-select: none;
      white-space: nowrap;
      width: 100%;
    `;
  },

  placeholderFocus(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColorLight};
    `;
  },

  placeholderDisabled(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColorDisabled};
    `;
  },

  input(t: Theme) {
    return css`
      -webkit-appearance: none;
      background: transparent;
      border: 0 none;
      color: ${t.inputTextColor};
      font: inherit;
      line-height: inherit;
      margin: 0;
      outline: none;
      padding: 0;
      text-overflow: clip;
      white-space: nowrap;
      width: 100%;

      &:-moz-placeholder {
        opacity: 1;
      }
      &::-moz-placeholder {
        opacity: 1;
      }
      &::-ms-clear {
        display: none;
      }
      &:-moz-placeholder {
        color: ${t.inputPlaceholderColor};
      }
      &::-moz-placeholder {
        color: ${t.inputPlaceholderColor};
      }
      &::placeholder {
        color: ${t.inputPlaceholderColor};
      }
    `;
  },

  inputFocus(t: Theme) {
    return css`
      &:-moz-placeholder {
        color: ${t.inputPlaceholderColorLight};
      }
      &::-moz-placeholder {
        color: ${t.inputPlaceholderColorLight};
      }
      &::placeholder {
        color: ${t.inputPlaceholderColorLight};
      }
    `;
  },

  inputDisabled(t: Theme) {
    return css`
      color: ${t.inputTextColorDisabled};
      /* fix text color in safari https://bugs.webkit.org/show_bug.cgi?id=115510 */
      -webkit-text-fill-color: ${t.inputTextColorDisabled};

      &:-moz-placeholder {
        -webkit-text-fill-color: ${t.inputPlaceholderColorDisabled};
      }
      &::-moz-placeholder {
        -webkit-text-fill-color: ${t.inputPlaceholderColorDisabled};
      }
      &::placeholder {
        -webkit-text-fill-color: ${t.inputPlaceholderColorDisabled};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      border-color: ${t.inputBorderColorWarning};
      box-shadow: 0 0 0 ${t.inputOutlineWidth} ${t.inputBorderColorWarning};
      z-index: 2;
    `;
  },

  warningFallback(t: Theme) {
    return css`
      box-shadow: none;
      outline: ${t.inputBorderWidth} solid ${t.inputBorderColorWarning};
    `;
  },

  error(t: Theme) {
    return css`
      border-color: ${t.inputBorderColorError};
      box-shadow: 0 0 0 ${t.inputOutlineWidth} ${t.inputBorderColorError};
      z-index: 2;
    `;
  },

  errorFallback(t: Theme) {
    return css`
      box-shadow: none;
      outline: ${t.inputBorderWidth} solid ${t.inputBorderColorError};
    `;
  },

  disabled(t: Theme) {
    return css`
      background-color: ${t.inputDisabledBg};
      border-color: ${t.inputDisabledBorderColor};
      box-shadow: none;
    `;
  },

  blink(t: Theme) {
    const blinkAnimation = keyframes`
    0% {
      background-color: ${t.inputBlinkColor};
    }
  `;
    return css`
      animation: ${blinkAnimation} 0.15s ease-in;
    `;
  },

  sizeSmall(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeSmall};
      line-height: ${t.inputLineHeightSmall};
      padding-top: ${t.inputPaddingYSmall};
      padding-bottom: ${t.inputPaddingYSmall};
      padding-left: ${t.inputPaddingXSmall};
      padding-right: ${t.inputPaddingXSmall};
      height: ${t.inputHeightSmall};
      border-radius: ${t.inputBorderRadiusSmall};
    `;
  },

  sizeSmallFallback(t: Theme) {
    return css`
      padding-top: ${shift(
        t.inputPaddingYSmall,
        shouldCompensateFontFamily(t.fontFamilyCompensationBaseline) ? '-1' : '0',
      )};
      padding-bottom: ${shift(
        t.inputPaddingYSmall,
        shouldCompensateFontFamily(t.fontFamilyCompensationBaseline) ? '1' : '0',
      )};
      padding-left: ${t.inputPaddingXSmall};
      padding-right: ${t.inputPaddingXSmall};
      line-height: normal;
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeMedium};
      line-height: ${t.inputLineHeightMedium};
      padding-top: ${t.inputPaddingYMedium};
      padding-bottom: ${t.inputPaddingYMedium};
      padding-left: ${t.inputPaddingXMedium};
      padding-right: ${t.inputPaddingXMedium};
      height: ${t.inputHeightMedium};
      border-radius: ${t.inputBorderRadiusMedium};
    `;
  },

  sizeMediumFallback(t: Theme) {
    return css`
      padding-top: ${shift(
        t.inputPaddingYMedium,
        shouldCompensateFontFamily(t.fontFamilyCompensationBaseline) ? '-1' : '0',
      )};
      padding-bottom: ${shift(
        t.inputPaddingYMedium,
        shouldCompensateFontFamily(t.fontFamilyCompensationBaseline) ? '1' : '0',
      )};
      padding-left: ${t.inputPaddingXMedium};
      padding-right: ${t.inputPaddingXMedium};
      line-height: normal;
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeLarge};
      line-height: ${t.inputLineHeightLarge};
      height: ${t.inputHeightLarge};
      padding-top: ${shift(
        t.inputPaddingYLarge,
        shouldCompensateFontFamily(t.fontFamilyCompensationBaseline) ? '-1' : '0',
      )};
      padding-bottom: ${shift(
        t.inputPaddingYLarge,
        shouldCompensateFontFamily(t.fontFamilyCompensationBaseline) ? '1' : '0',
      )};
      padding-left: ${t.inputPaddingXLarge};
      padding-right: ${t.inputPaddingXLarge};
      border-radius: ${t.inputBorderRadiusLarge};
    `;
  },

  sizeLargeFallback(t: Theme) {
    return css`
      padding-top: ${shift(
        t.inputPaddingYLarge,
        shouldCompensateFontFamily(t.fontFamilyCompensationBaseline) ? '-2' : '0',
      )};
      padding-bottom: ${shift(
        t.inputPaddingYLarge,
        shouldCompensateFontFamily(t.fontFamilyCompensationBaseline) ? '2' : '0',
      )};
      padding-left: ${t.inputPaddingXLarge};
      padding-right: ${t.inputPaddingXLarge};
      line-height: normal;
    `;
  },

  prefix(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColor};
    `;
  },

  prefixDisabled(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColorDisabled};
    `;
  },

  suffix(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColor};
    `;
  },

  suffixDisabled(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColorDisabled};
    `;
  },

  sideContainer() {
    return css`
      align-items: center;
      display: flex;
      flex-shrink: 0;
      height: 100%;

      &::before {
        content: '\\a0';
        display: inline-block;
        width: 0;
      }
    `;
  },

  rightContainer() {
    return css`
      justify-self: flex-end;
      margin: 0 0 0 auto;
      padding-left: 0;
    `;
  },

  icon() {
    return css`
      flex-shrink: 0;
      cursor: text;
      z-index: 2;
      text-align: center;
      box-sizing: content-box !important; // fix possible "reset.css" problem
    `;
  },

  iconFocus(t: Theme) {
    return css`
      color: ${t.inputFocusedIconColor};
    `;
  },

  iconDisabled() {
    return css`
      cursor: default;
    `;
  },

  leftIconSmall(t: Theme) {
    return css`
      min-width: ${t.inputIconSizeSmall};
      padding-right: ${t.inputIconGapSmall};
    `;
  },

  rightIconSmall(t: Theme) {
    return css`
      min-width: ${t.inputIconSizeSmall};
      padding-left: ${t.inputIconGapSmall};
    `;
  },

  leftIconMedium(t: Theme) {
    return css`
      min-width: ${t.inputIconSizeMedium};
      padding-right: ${t.inputIconGapMedium};
    `;
  },

  rightIconMedium(t: Theme) {
    return css`
      min-width: ${t.inputIconSizeMedium};
      padding-left: ${t.inputIconGapMedium};
    `;
  },

  leftIconLarge(t: Theme) {
    return css`
      min-width: ${t.inputIconSizeLarge};
      padding-right: ${t.inputIconGapLarge};
    `;
  },

  rightIconLarge(t: Theme) {
    return css`
      min-width: ${t.inputIconSizeLarge};
      padding-left: ${t.inputIconGapLarge};
    `;
  },

  hideBlinkingCursor() {
    return css`
      caret-color: transparent;
    `;
  },
});
