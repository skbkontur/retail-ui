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
      border: ${t.inputBorderWidth} solid ${t.borderColorGrayLight};
      border-top-color: ${t.inputBorderTopColor};
      box-shadow: ${t.inputShadow};
      box-sizing: border-box;
      color: ${t.inputColor};
      cursor: text;
      display: inline-flex;
      outline: none;
      position: relative;
      width: 250px;

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
      border-color: ${t.borderColorFocus};
      box-shadow: ${t.inputFocusShadow};
      outline: none;
      z-index: 2;

      ${cssName(styles.input(t))}:-moz-placeholder {
        color: ${t.placeholderColorLight};
      }
      ${cssName(styles.input(t))}::-moz-placeholder {
        color: ${t.placeholderColorLight};
      }
      ${cssName(styles.input(t))}::placeholder {
        color: ${t.placeholderColorLight};
      }
    `;
  },

  focusFallback(t: Theme) {
    return css`
      box-shadow: none;
      outline: 1px solid ${t.inputFocusOutline};
    `;
  },

  placeholder(t: Theme) {
    return css`
      -ms-user-select: none;
      color: ${t.placeholderColor};
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
        color: ${t.placeholderColorLight};
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
        color: ${t.placeholderColor};
      }
      &::-moz-placeholder {
        color: ${t.placeholderColor};
      }
      &::placeholder {
        color: ${t.placeholderColor};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      & {
        border-color: ${t.borderColorWarning} !important;
        box-shadow: 0 0 0 1px ${t.borderColorWarning} !important;
        z-index: 2;
      }
    `;
  },

  warningFallback(t: Theme) {
    return css`
      box-shadow: none !important;
      outline: 1px solid ${t.borderColorWarning} !important;
    `;
  },

  error(t: Theme) {
    return css`
      border-color: ${t.borderColorError} !important;
      box-shadow: 0 0 0 1px ${t.borderColorError} !important;
      z-index: 2;
    `;
  },

  errorFallback(t: Theme) {
    return css`
      box-shadow: none !important;
      outline: 1px solid ${t.borderColorError} !important;
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
        color: ${t.textColorDisabled};
        pointer-events: none;
        /* fix text color in safari */
        -webkit-text-fill-color: currentcolor;
      }
      ${cssName(styles.input(t))}:-moz-placeholder {
        -webkit-text-fill-color: ${t.placeholderColor};
      }
      ${cssName(styles.input(t))}::-moz-placeholder {
        -webkit-text-fill-color: ${t.placeholderColor};
      }
      ${cssName(styles.input(t))}::placeholder {
        -webkit-text-fill-color: ${t.placeholderColor};
      }
    `;
  },

  blink(t: Theme) {
    const blinkAnimation = keyframes`
    0% {
      background-color: ${t.blinkColor};
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
        line-height: ${t.controlLineHeightSmall} !important;
        padding-top: ${t.controlPaddingYSmall};
        padding-bottom: ${t.controlPaddingYSmall};
        height: ${t.controlHeightSmall};
      }
    `;
  },

  sizeSmallFallback(t: Theme) {
    return css`
      padding-top: ${shift(t.controlPaddingYSmall, '-1')};
      padding-bottom: ${shift(t.controlPaddingYSmall, '1')};
      line-height: normal !important;
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      & {
        font-size: ${t.inputFontSizeMedium};
        line-height: ${t.controlLineHeightMedium} !important;
        padding-top: ${t.controlPaddingYMedium};
        padding-bottom: ${t.controlPaddingYMedium};
        height: ${t.controlHeightMedium};
      }
    `;
  },

  sizeMediumFallback(t: Theme) {
    return css`
      padding-top: ${shift(t.controlPaddingYMedium, '-1')};
      padding-bottom: ${shift(t.controlPaddingYMedium, '1')};
      line-height: normal !important;
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeLarge};
      line-height: ${t.controlLineHeightLarge} !important;
      height: ${t.controlHeightLarge};
      padding-top: ${shift(t.controlPaddingYLarge, '-1')};
      padding-bottom: ${shift(t.controlPaddingYLarge, '1')};
    `;
  },

  sizeLargeFallback(t: Theme) {
    return css`
      padding-top: ${shift(t.controlPaddingYLarge, '-2')};
      padding-bottom: ${shift(t.controlPaddingYLarge, '2')};
      line-height: normal !important;
    `;
  },

  prefix(t: Theme) {
    return css`
      color: ${t.placeholderColor};
    `;
  },

  suffix(t: Theme) {
    return css`
      color: ${t.placeholderColor};
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
