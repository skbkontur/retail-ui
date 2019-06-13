import { css } from '../../lib/theming/Emotion';
import classes from './Input.less';
import { ITheme } from '../../lib/theming/Theme';
import DimensionFunctions from '../../lib/styles/DimensionFunctions';

const jsClasses = {
  root(t: ITheme) {
    return css`
      color: ${t.inputColor};
      background-color: ${t.inputBg};
      box-shadow: ${t.inputShadow};
      border: ${t.inputBorderWidth} solid ${t.borderColorGrayLight};
      border-top-color: ${t.inputBorderTopColor};
    `;
  },

  useDefaultColor(t: ITheme) {
    return css`
      .${classes.leftIcon}&, .${classes.rightIcon}& {
        color: ${t.inputIconColor};
      }
    `;
  },

  focus(t: ITheme) {
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

  placeholder(t: ITheme) {
    return css`
      color: ${t.placeholderColor};

      .${classes.root}.${classes.focus} & {
        color: ${t.placeholderColorLight};
      }
    `;
  },

  input(t: ITheme) {
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

  warning(t: ITheme) {
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

  error(t: ITheme) {
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

  disabled(t: ITheme) {
    return css`
      .${classes.root}& {
        background: ${t.inputDisabledBg};
        border-color: ${t.inputDisabledBorderColor};
      }
    `;
  },

  blink(t: ITheme) {
    return css`
      .${classes.root}& {
        background-color: ${t.blinkColor};
      }
    `;
  },

  sizeSmall(t: ITheme) {
    return css`
      font-size: ${t.fontSizeSmall};
      line-height: ${t.controlLineHeightSmall};
      padding-top: ${t.controlPaddingYSmall};
      padding-bottom: ${t.controlPaddingYSmall};
      height: ${t.controlHeightSmall};

      .rt-ie-any & {
        padding-top: ${DimensionFunctions.shift(t.controlPaddingYSmall, '-1')};
        padding-bottom: ${DimensionFunctions.shift(t.controlPaddingYSmall, '1')};
        line-height: normal;
      }
    `;
  },

  sizeMedium(t: ITheme) {
    return css`
      font-size: ${t.fontSizeMedium};
      line-height: ${t.controlLineHeightMedium};
      padding-top: ${t.controlPaddingYMedium};
      padding-bottom: ${t.controlPaddingYMedium};
      height: ${t.controlHeightMedium};

      .rt-ie-any & {
        padding-top: ${DimensionFunctions.shift(t.controlPaddingYMedium, '-1')};
        padding-bottom: ${DimensionFunctions.shift(t.controlPaddingYMedium, '1')};
        line-height: normal;
      }
    `;
  },

  sizeLarge(t: ITheme) {
    return css`
      font-size: ${t.fontSizeLarge};
      line-height: ${t.controlLineHeightLarge};
      height: ${t.controlHeightLarge};
      padding-top: ${DimensionFunctions.shift(t.controlPaddingYLarge, '-1')};
      padding-bottom: ${DimensionFunctions.shift(t.controlPaddingYLarge, '1')};

      .rt-ie-any & {
        padding-top: ${DimensionFunctions.shift(t.controlPaddingYLarge, '-2')};
        padding-bottom: ${DimensionFunctions.shift(t.controlPaddingYLarge, '2')};
        line-height: normal;
      }
    `;
  },

  prefix(t: ITheme) {
    return css`
      color: ${t.placeholderColor};
    `;
  },

  suffix(t: ITheme) {
    return css`
      color: ${t.placeholderColor};
    `;
  },
};

export default jsClasses;
