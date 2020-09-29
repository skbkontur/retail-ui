import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  label(t: Theme) {
    return css`
      background-color: ${t.tokenInputBg};
      box-shadow: ${t.tokenInputShadow};
      border: ${t.tokenInputBorderWidth} solid ${t.tokenInputBorderColor};
      border-top-color: ${t.tokenInputBorderTopColor};
      box-sizing: border-box;
      cursor: text;
      padding: ${t.tokenInputPaddingY} ${t.tokenInputPaddingX};
      display: flex;
      flex-wrap: wrap;
      align-items: start;
      outline: none;
    `;
  },

  warning(t: Theme) {
    return css`
      border: ${t.tokenInputBorderWidth} solid ${t.tokenInputBorderColorWarning} !important;
      box-shadow: 0 0 0 ${t.tokenInputOutlineWidth} ${t.tokenInputBorderColorWarning} !important;
    `;
  },

  error(t: Theme) {
    return css`
      border: ${t.tokenInputBorderWidth} solid ${t.tokenInputBorderColorError} !important;
      box-shadow: 0 0 0 ${t.tokenInputOutlineWidth} ${t.tokenInputBorderColorError} !important;
    `;
  },

  labelFocused(t: Theme) {
    return css`
      border: ${t.tokenInputBorderWidth} solid ${t.tokenInputBorderColorFocus} !important;
      box-shadow: 0 0 0 ${t.tokenInputOutlineWidth} ${t.tokenInputBorderColorFocus} !important;
    `;
  },

  labelDisabled(t: Theme) {
    return css`
      background: ${t.tokenInputDisabledBg} !important;
      border-color: ${t.tokenInputDisabledBorderColor} !important;
      box-shadow: none !important;
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
      padding: 0 ${t.tokenTextareaPaddingXRight} 0 5px;
      overflow: hidden;
      resize: none;
      font-size: ${t.tokenInputFontSize};
      height: ${t.tokenInputLineHeight};
      line-height: ${t.tokenInputLineHeight};
      -webkit-appearance: none;
      text-overflow: clip;
      background-clip: padding-box;
      transition: background-color 0.15s ease-in;
      color: ${t.tokenInputTextColor};

      &::-ms-clear {
        display: none;
      }
      &::placeholder {
        color: ${t.tokenInputPlaceholderColor};
        -webkit-text-fill-color: ${t.tokenInputPlaceholderColor};
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

  helperContainer() {
    return css`
      position: relative;
      width: 100%;
    `;
  },

  helperText(t: Theme) {
    return css`
      position: absolute;
      top: -100000px;
      max-width: 100%;
      word-break: break-word;
      margin: 0 ${t.tokenTextareaPaddingXRight} 0 ${t.tokenTextareaPaddingXLeft};
      font-size: ${t.tokenInputFontSize};
      line-height: ${t.tokenInputLineHeight};
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

  reservedInput(t: Theme) {
    return css`
      min-height: ${t.tokenInputLineHeight};
      line-height: ${t.tokenInputLineHeight};
      font-size: ${t.tokenInputFontSize};
      margin: ${t.tokenMarginY} 0 ${t.tokenMarginY} 0;
      padding: 0 ${t.tokenTextareaPaddingXRight} 0 ${t.tokenTextareaPaddingXLeft};
      color: ${t.tokenInputTextColorDisabled};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
