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
      outline: none;
    `;
  },

  warning(t: Theme) {
    return css`
      border: 1px solid ${t.tokenInputBorderColorWarning};
      box-shadow: 0 0 0 1px ${t.tokenInputBorderColorWarning};
    `;
  },

  error(t: Theme) {
    return css`
      border: 1px solid ${t.tokenInputBorderColorError};
      box-shadow: 0 0 0 1px ${t.tokenInputBorderColorError};
    `;
  },

  labelFocused(t: Theme) {
    return css`
      border: 1px solid ${t.tokenInputBorderColorFocus};
      box-shadow: 0 0 0 1px ${t.tokenInputBorderColorFocus};
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
      font-size: 14px;
      padding: 0 0 0 5px;
      height: ${t.tokenInputInnerHeight};
      line-height: ${t.tokenInputInnerHeight};
      -webkit-appearance: none;
      white-space: nowrap;
      text-overflow: clip;
      background-clip: padding-box;
      transition: background-color 0.15s ease-in;

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
