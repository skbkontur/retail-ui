import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const mixins = {
  inputAndHelperCommonStyles(t: Theme) {
    return css`
      padding: 0 ${t.tokenInputInputPaddingRight} 0 ${t.tokenInputInputPaddingLeft};
      line-height: ${t.tokenInputLineHeight};
      font-size: ${t.tokenInputFontSize};
    `;
  },
  inputAndHelperCommonEditingStyles(t: Theme) {
    return css`
      margin: ${t.tokenMarginY} ${t.tokenMarginX};
      padding: 0 ${t.tokenInputInputPaddingRight} 0 ${t.tokenPaddingX};
      line-height: ${t.tokenLineHeight};
    `;
  },
};

export const styles = memoizeStyle({
  label(t: Theme) {
    return css`
      background-color: ${t.tokenInputBg};
      box-shadow: ${t.tokenInputShadow};
      border: ${t.tokenInputBorderWidth} solid ${t.tokenInputBorderColor};
      border-radius: ${t.tokenInputBorderRadius};
      border-top-color: ${t.tokenInputBorderTopColor};
      box-sizing: border-box;
      cursor: text;
      padding: ${t.tokenInputPaddingY} ${t.tokenInputPaddingX};
      display: flex;
      flex-wrap: wrap;
      align-items: start;
      outline: none;
      position: relative;
    `;
  },

  warning(t: Theme) {
    return css`
      border: ${t.tokenInputBorderWidth} solid ${t.tokenInputBorderColorWarning};
      box-shadow: 0 0 0 ${t.tokenInputOutlineWidth} ${t.tokenInputBorderColorWarning};
    `;
  },

  error(t: Theme) {
    return css`
      border: ${t.tokenInputBorderWidth} solid ${t.tokenInputBorderColorError};
      box-shadow: 0 0 0 ${t.tokenInputOutlineWidth} ${t.tokenInputBorderColorError};
    `;
  },

  labelFocused(t: Theme) {
    return css`
      border: ${t.tokenInputBorderWidth} solid ${t.tokenInputBorderColorFocus};
      box-shadow: 0 0 0 ${t.tokenInputOutlineWidth} ${t.tokenInputBorderColorFocus};
    `;
  },

  labelDisabled(t: Theme) {
    return css`
      background: ${t.tokenInputDisabledBg};
      border-color: ${t.tokenInputDisabledBorderColor};
      box-shadow: none;
    `;
  },

  input(t: Theme) {
    return css`
      min-width: 0;
      max-width: 100%;
      width: 50px;
      background: transparent;
      border: none;
      box-shadow: none;
      outline: none;
      font-family: inherit;
      margin: ${t.tokenMarginY} 0 ${t.tokenMarginY} 0;
      overflow: hidden;
      resize: none;
      height: ${t.tokenInputLineHeight};
      -webkit-appearance: none;
      text-overflow: clip;
      background-clip: padding-box;
      transition: background-color 0.15s ease-in;
      color: ${t.tokenInputTextColor};
      box-sizing: border-box;
      word-break: break-all;

      ${mixins.inputAndHelperCommonStyles(t)};

      &::-ms-clear {
        display: none;
      }
      &::placeholder {
        color: ${t.tokenInputPlaceholderColor};
        -webkit-text-fill-color: ${t.tokenInputPlaceholderColor};
      }
      &:disabled::placeholder {
        color: ${t.tokenInputPlaceholderColorDisabled};
        -webkit-text-fill-color: ${t.tokenInputPlaceholderColorDisabled};
      }
      &:focus::placeholder {
        color: ${t.tokenInputPlaceholderColorLight};
        -webkit-text-fill-color: ${t.tokenInputPlaceholderColorLight};
      }
      /* fix firefox placeholder opacity */
      &:-moz-placeholder {
        opacity: 1;
      }
      &::-moz-placeholder {
        opacity: 1;
      }
    `;
  },

  helperContainer(t: Theme) {
    return css`
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: ${t.tokenInputPaddingY} ${t.tokenInputPaddingX};
      visibility: hidden;
    `;
  },

  helperText(t: Theme) {
    return css`
      max-width: 100%;
      word-break: break-all;

      // don't collapse spaces
      // so they get counted in width
      white-space: pre-wrap;

      ${mixins.inputAndHelperCommonStyles(t)}
    `;
  },

  helperTextEditing(t: Theme) {
    return css`
      ${mixins.inputAndHelperCommonEditingStyles(t)};

      font-size: ${t.tokenFontSize};
      padding-bottom: ${t.tokenLegacyTextShift};
    `;
  },

  inputDisabled(t: Theme) {
    return css`
      pointer-events: none;
      /* fix text color in safari */
      -webkit-text-fill-color: currentcolor;
      color: ${t.tokenInputTextColorDisabled};
    `;
  },

  inputEditing(t: Theme) {
    return css`
      ${mixins.inputAndHelperCommonEditingStyles(t)};
    `;
  },

  reservedInput(t: Theme) {
    return css`
      min-width: 2px;
      min-height: ${t.tokenInputLineHeight};
      line-height: ${t.tokenInputLineHeight};
      font-size: ${t.tokenInputFontSize};
      margin: ${t.tokenMarginY} 0 ${t.tokenMarginY} 0;
      padding: 0 ${t.tokenInputInputPaddingRight} 0 ${t.tokenInputInputPaddingLeft};
      color: ${t.tokenInputTextColorDisabled};
      word-break: break-all;
    `;
  },
});
