import { css, cssName, keyframes, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { shift } from '../../lib/styles/DimensionFunctions';
import { resetText } from '../../lib/styles/Mixins';

const styles = {
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
      border-color: ${t.inputBorderColorFocus};
      box-shadow: ${t.inputFocusShadow};
      outline: none;
      z-index: 2;

      ${cssName(styles.input(t))}:-moz-placeholder {
        color: ${t.inputPlaceholderColorLight};
      }
      ${cssName(styles.input(t))}::-moz-placeholder {
        color: ${t.inputPlaceholderColorLight};
      }
      ${cssName(styles.input(t))}::placeholder {
        color: ${t.inputPlaceholderColorLight};
      }
    `;
  },

  focusFallback(t: Theme) {
    return css`
      box-shadow: none;
      outline: ${t.inputBorderWidth} solid ${t.inputFocusOutline};
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

      ${cssName(styles.focus(t))} & {
        color: ${t.inputPlaceholderColorLight};
      }
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

  warning(t: Theme) {
    return css`
      & {
        border-color: ${t.inputBorderColorWarning} !important;
        box-shadow: 0 0 0 ${t.inputBorderWidth} ${t.inputBorderColorWarning} !important;
        z-index: 2;
      }
    `;
  },

  warningFallback(t: Theme) {
    return css`
      box-shadow: none !important;
      outline: ${t.inputBorderWidth} solid ${t.inputBorderColorWarning} !important;
    `;
  },

  error(t: Theme) {
    return css`
      border-color: ${t.inputBorderColorError} !important;
      box-shadow: 0 0 0 ${t.inputBorderWidth} ${t.inputBorderColorError} !important;
      z-index: 2;
    `;
  },

  errorFallback(t: Theme) {
    return css`
      box-shadow: none !important;
      outline: ${t.inputBorderWidth} solid ${t.inputBorderColorError} !important;
    `;
  },

  disabled(t: Theme) {
    return css`
      background: ${t.inputDisabledBg};
      border-color: ${t.inputDisabledBorderColor} !important;
      box-shadow: none;

      ${cssName(styles.leftIcon())},
      ${cssName(styles.rightIcon())} {
        cursor: default;
      }
      ${cssName(styles.input(t))} {
        color: ${t.inputTextColorDisabled};
        pointer-events: none;
        /* fix text color in safari */
        -webkit-text-fill-color: currentcolor;
      }
      ${cssName(styles.input(t))}:-moz-placeholder {
        -webkit-text-fill-color: ${t.inputPlaceholderColor};
      }
      ${cssName(styles.input(t))}::-moz-placeholder {
        -webkit-text-fill-color: ${t.inputPlaceholderColor};
      }
      ${cssName(styles.input(t))}::placeholder {
        -webkit-text-fill-color: ${t.inputPlaceholderColor};
      }
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
      & {
        font-size: ${t.inputFontSizeSmall};
        line-height: ${t.inputLineHeightSmall} !important;
        padding-top: ${t.inputPaddingYSmall};
        padding-bottom: ${t.inputPaddingYSmall};
        height: ${t.inputHeightSmall};
      }
    `;
  },

  sizeSmallFallback(t: Theme) {
    return css`
      padding-top: ${shift(t.inputPaddingYSmall, '-1')};
      padding-bottom: ${shift(t.inputPaddingYSmall, '1')};
      line-height: normal !important;
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeMedium};
      line-height: ${t.inputLineHeightMedium} !important;
      padding-top: ${t.inputPaddingYMedium};
      padding-bottom: ${t.inputPaddingYMedium};
      height: ${t.inputHeightMedium};
    `;
  },

  sizeMediumFallback(t: Theme) {
    return css`
      padding-top: ${shift(t.inputPaddingYMedium, '-1')};
      padding-bottom: ${shift(t.inputPaddingYMedium, '1')};
      line-height: normal !important;
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeLarge};
      line-height: ${t.inputLineHeightLarge} !important;
      height: ${t.inputHeightLarge};
      padding-top: ${shift(t.inputPaddingYLarge, '-1')};
      padding-bottom: ${shift(t.inputPaddingYLarge, '1')};
    `;
  },

  sizeLargeFallback(t: Theme) {
    return css`
      padding-top: ${shift(t.inputPaddingYLarge, '-2')};
      padding-bottom: ${shift(t.inputPaddingYLarge, '2')};
      line-height: normal !important;
    `;
  },

  prefix(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColor};
    `;
  },

  suffix(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColor};
    `;
  },

  sideContainer() {
    return css`
      align-items: center;
      display: flex;
      flex-shrink: 0;
      height: 100%;
      min-width: 10px;
      padding-left: 10px;

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
      padding-right: 10px;
    `;
  },

  leftIcon() {
    return css`
      padding-right: 2px;
      flex-shrink: 0;
      cursor: text;
      z-index: 2;
    `;
  },

  rightIcon() {
    return css`
      padding-left: 2px;
      flex-shrink: 0;
      cursor: text;
      z-index: 2;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
