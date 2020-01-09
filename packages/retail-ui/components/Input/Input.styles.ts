import { css, keyframes } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { shift } from '../../lib/styles/DimensionFunctions';
import { resetText } from '../../lib/styles/Mixins';

import classes from './Input.module.less';

export const jsStyles = {
  root(t: Theme) {
    return css`
      ${resetText()};

      width: 250px;
      color: ${t.inputColor};
      background-color: ${t.inputBg};
      box-shadow: ${t.inputShadow};
      border: ${t.inputBorderWidth} solid ${t.borderColorGrayLight};
      border-top-color: ${t.inputBorderTopColor};
    `;
  },

  useDefaultColor(t: Theme) {
    return css`
      .${classes.leftIcon}&, .${classes.rightIcon}& {
        color: ${t.inputIconColor};
      }
    `;
  },

  focus(t: Theme) {
    return css`
      .${classes.root}& {
        border-color: ${t.borderColorFocus};
        box-shadow: ${t.inputFocusShadow};
      }
      .rt-ie-any .${classes.root}& {
        outline: 1px solid ${t.inputFocusOutline};
      }
    `;
  },

  placeholder(t: Theme) {
    return css`
      color: ${t.placeholderColor};

      .${classes.root}.${classes.focus} & {
        color: ${t.placeholderColorLight};
      }
    `;
  },

  input(t: Theme) {
    return css`
      color: ${t.inputTextColor};

      .${classes.root}.${classes.focus} &:-moz-placeholder {
        color: ${t.placeholderColorLight};
      }
      .${classes.root}.${classes.focus} &::-moz-placeholder {
        color: ${t.placeholderColorLight};
      }
      .${classes.root}.${classes.focus} &::placeholder {
        color: ${t.placeholderColorLight};
      }
      .${classes.root}.${classes.disabled} & {
        color: ${t.textColorDisabled};
      }
      .${classes.root}.${classes.disabled} &:-moz-placeholder {
        -webkit-text-fill-color: ${t.placeholderColor};
      }
      .${classes.root}.${classes.disabled} &::-moz-placeholder {
        -webkit-text-fill-color: ${t.placeholderColor};
      }
      .${classes.root}.${classes.disabled} &::placeholder {
        -webkit-text-fill-color: ${t.placeholderColor};
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
      .${classes.root}& {
        border-color: ${t.borderColorWarning};
        box-shadow: 0 0 0 1px ${t.borderColorWarning};
      }
      .rt-ie-any .${classes.root}& {
        outline: 1px solid ${t.borderColorWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      .${classes.root}& {
        border-color: ${t.borderColorError};
        box-shadow: 0 0 0 1px ${t.borderColorError};
      }
      .rt-ie-any .${classes.root}& {
        outline: 1px solid ${t.borderColorError};
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      .${classes.root}& {
        background: ${t.inputDisabledBg};
        border-color: ${t.inputDisabledBorderColor};
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
      .${classes.root}& {
        animation: ${blinkAnimation} 0.15s ease-in;
      }
    `;
  },

  sizeSmall(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeSmall};
      line-height: ${t.controlLineHeightSmall};
      padding-top: ${t.controlPaddingYSmall};
      padding-bottom: ${t.controlPaddingYSmall};
      height: ${t.controlHeightSmall};

      .rt-ie-any & {
        padding-top: ${shift(t.controlPaddingYSmall, '-1')};
        padding-bottom: ${shift(t.controlPaddingYSmall, '1')};
        line-height: normal;
      }
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeMedium};
      line-height: ${t.controlLineHeightMedium};
      padding-top: ${t.controlPaddingYMedium};
      padding-bottom: ${t.controlPaddingYMedium};
      height: ${t.controlHeightMedium};

      .rt-ie-any & {
        padding-top: ${shift(t.controlPaddingYMedium, '-1')};
        padding-bottom: ${shift(t.controlPaddingYMedium, '1')};
        line-height: normal;
      }
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeLarge};
      line-height: ${t.controlLineHeightLarge};
      height: ${t.controlHeightLarge};
      padding-top: ${shift(t.controlPaddingYLarge, '-1')};
      padding-bottom: ${shift(t.controlPaddingYLarge, '1')};

      .rt-ie-any & {
        padding-top: ${shift(t.controlPaddingYLarge, '-2')};
        padding-bottom: ${shift(t.controlPaddingYLarge, '2')};
        line-height: normal;
      }
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
};
