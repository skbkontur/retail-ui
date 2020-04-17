import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root() {
    return css`
      display: inline-block;
    `;
  },
  label(t: Theme) {
    return css`
      background-color: ${t.inputBg};
      box-shadow: ${t.inputShadow};
      border: ${t.inputBorderWidth} solid ${t.borderColorGrayLight};
      border-top-color: ${t.inputBorderTopColor};
      box-sizing: border-box;
      cursor: text;
      padding: 2px 4px;
      display: flex;
      flex-wrap: wrap;
      outline: none;
    `;
  },

  warning(t: Theme) {
    return css`
      border: 1px solid ${t.borderColorWarning};
      box-shadow: 0 0 0 1px ${t.borderColorWarning};
    `;
  },

  error(t: Theme) {
    return css`
      border: 1px solid ${t.borderColorError};
      box-shadow: 0 0 0 1px ${t.borderColorError};
    `;
  },

  labelFocused(t: Theme) {
    return css`
      border: 1px solid ${t.borderColorFocus};
      box-shadow: 0 0 0 1px ${t.borderColorFocus};
    `;
  },

  labelDisabled(t: Theme) {
    return css`
      background: ${t.inputDisabledBg};
      border-color: ${t.inputDisabledBorderColor};
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
      margin: 2px 0;
      font-family: inherit;
      font-size: 14px;
      padding: 0 0 0 5px;
      height: 24px;
      line-height: 24px;
      -webkit-appearance: none;
      white-space: nowrap;
      text-overflow: clip;
      background-clip: padding-box;
      transition: background-color 0.15s ease-in;

      &::-ms-clear {
        display: none;
      }
      &::placeholder {
        color: ${t.placeholderColor};
        -webkit-text-fill-color: ${t.placeholderColor};
      }
      &:focus::placeholder {
        color: ${t.placeholderColorLight};
        -webkit-text-fill-color: ${t.placeholderColorLight};
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
      color: ${t.textColorDisabled};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
