import { css } from 'emotion';
import classes from './Input.less';
import { ITheme } from '../../lib/ThemeManager';

const jsClasses = {
  root(t: ITheme) {
    return css`
      color: ${t.inputColor};
      background-color: ${t.inputBg};
      box-shadow: ${t.inputShadow};
      border: ${t.inputBorderWidth} solid ${t.borderColorGrayLight};
      border-top-color: ${t.inputBorderTopColor};
      }
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
        border-color: ${t.warningMain};
        box-shadow: 0 0 0 1px ${t.warningMain};
      }
      .rt-ie-any .${classes.root}& {
        outline: 1px solid ${t.warningMain};
      }
    `;
  },

  error(t: ITheme) {
    return css`
      .${classes.root}& {
        border-color: ${t.errorMain};
        box-shadow: 0 0 0 1px ${t.errorMain};
      }
      .rt-ie-any .${classes.root}& {
        outline: 1px solid ${t.errorMain};
      }
    `;
  },

  disabled(t: ITheme) {
    return css`
      .${classes.root}& {
        border-color: ${t.inputDisabledBorderColor};
        background: ${t.inputDisabledBg};
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
      line-height: ${t.controlLineHeightSmall};
      padding-top: ${t.controlPaddingYSmall};
      padding-bottom: ${t.controlPaddingYSmall};
      height: ${t.controlHeightSmall};

      .rt-ie-any & {
        padding-top: ${addOffset(t.controlPaddingYSmall, -1)};
        padding-bottom: ${addOffset(t.controlPaddingYSmall, 1)};
      }
    `;
  },

  sizeMedium(t: ITheme) {
    return css`
      line-height: ${t.controlLineHeightMedium};
      padding-top: ${t.controlPaddingYMedium};
      padding-bottom: ${t.controlPaddingYMedium};
      height: ${t.controlHeightMedium};

      .rt-ie-any & {
        padding-top: ${addOffset(t.controlPaddingYMedium, -1)};
        padding-bottom: ${addOffset(t.controlPaddingYMedium, 1)};
      }
    `;
  },

  DEPRECATED_sizeMedium(t: ITheme) {
    return css`
      line-height: ${t.controlLineHeightMedium};
      padding-top: ${t.controlPaddingYMedium};
      padding-bottom: ${t.controlPaddingYMedium};
      height: ${t.controlHeightMedium};

      .rt-ie-any & {
        padding-top: ${addOffset(t.controlPaddingYMedium, -1)};
        padding-bottom: ${addOffset(t.controlPaddingYMedium, 1)};
      }
    `;
  },

  sizeLarge(t: ITheme) {
    return css`
      line-height: ${t.controlLineHeightLarge};
      height: ${t.controlHeightLarge};
      padding-top: ${addOffset(t.controlPaddingYLarge, -1)};
      padding-bottom: ${addOffset(t.controlPaddingYLarge, 1)};

      .rt-ie-any & {
        padding-top: ${addOffset(t.controlPaddingYLarge, -2)};
        padding-bottom: ${addOffset(t.controlPaddingYLarge, 2)};
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

function addOffset(padding: string, offset: number): string {
  return `${parseFloat(padding) + offset}px`;
}

export default jsClasses;
