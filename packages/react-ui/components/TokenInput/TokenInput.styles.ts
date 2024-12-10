import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

import { labelSizeMixin, inputSizeMixin } from './TokenInput.mixins';

export const styles = memoizeStyle({
  label(t: Theme) {
    return css`
      background-color: ${t.tokenInputBg};
      box-shadow: ${t.tokenInputShadow};
      border: ${t.tokenInputBorderWidth} solid ${t.tokenInputBorderColor};
      border-top-color: ${t.tokenInputBorderTopColor};
      transition: border-color ${t.transitionDuration} ${t.transitionTimingFunction};
      box-sizing: border-box;
      cursor: text;
      display: flex;
      flex-wrap: wrap;
      align-items: start;
      outline: none;
      position: relative;
      border-radius: ${t.tokenInputBorderRadius};
    `;
  },
  labelSmall(t: Theme) {
    return css`
      ${labelSizeMixin(t.tokenInputPaddingYSmall, t.tokenInputPaddingXSmall)}
    `;
  },
  labelMedium(t: Theme) {
    return css`
      ${labelSizeMixin(t.tokenInputPaddingYMedium, t.tokenInputPaddingXMedium)}
    `;
  },
  labelLarge(t: Theme) {
    return css`
      ${labelSizeMixin(t.tokenInputPaddingYLarge, t.tokenInputPaddingXLarge)}
    `;
  },

  hovering(t: Theme) {
    return css`
      &:hover {
        border-color: ${t.tokenInputBorderColorHover};
      }
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
      background-clip: ${t.inputDisabledBackgroundClip};
      border-color: ${t.tokenInputDisabledBorderColor};
      box-shadow: none;
      cursor: default;
    `;
  },

  input(t: Theme) {
    return css`
      background: transparent;
      border: none;
      box-shadow: none;
      outline: none;
      font-family: inherit;
      overflow: hidden;
      resize: none;
      -webkit-appearance: none;
      text-overflow: clip;
      background-clip: padding-box;
      transition: background-color 0.15s ease-in;
      color: ${t.tokenInputTextColor};
      box-sizing: border-box;
      word-break: break-all;
      padding: 0;
      margin: 0;
      flex: 1 1 100%;

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
  inputSmall(t: Theme) {
    return css`
      ${inputSizeMixin(t.tokenFontSizeSmall, t.tokenInputLineHeightSmall)};
    `;
  },
  inputMedium(t: Theme) {
    return css`
      ${inputSizeMixin(t.tokenFontSizeMedium, t.tokenInputLineHeightMedium)};
    `;
  },
  inputLarge(t: Theme) {
    return css`
      ${inputSizeMixin(t.tokenFontSizeLarge, t.tokenInputLineHeightLarge)};
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

  inputPlaceholderWrapper() {
    return css`
      flex: 1 1 100%;
    `;
  },

  reservedInput(t: Theme) {
    return css`
      min-width: 2px;
      color: ${t.tokenInputTextColorDisabled};
      word-break: break-all;
    `;
  },
});
