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
      padding: 0 0 0 5px;
      font-size: ${t.tokenInputFontSize};
      height: ${t.tokenInputLineHeight};
      line-height: ${t.tokenInputLineHeight};
      -webkit-appearance: none;
      white-space: nowrap;
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

  inputDisabled(t: Theme) {
    return css`
      pointer-events: none;
      /* fix text color in safari */
      -webkit-text-fill-color: currentcolor;
      color: ${t.tokenInputTextColorDisabled};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
