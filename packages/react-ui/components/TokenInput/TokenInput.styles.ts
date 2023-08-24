import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import {
  helperContainerAndLabelCommonSizeMixin,
  helperTextEditingSizeMixin,
  inputAndHelperCommonEditingStylesSizeMixin,
  inputAndHelperCommonStyles,
  inputSizeMixin,
  reservedInputSizeMixin,
} from './TokenInput.mixins';

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
      ${helperContainerAndLabelCommonSizeMixin(t.tokenInputPaddingYSmall, t.tokenInputPaddingXSmall)}
    `;
  },
  labelMedium(t: Theme) {
    return css`
      ${helperContainerAndLabelCommonSizeMixin(t.tokenInputPaddingYMedium, t.tokenInputPaddingXMedium)}
    `;
  },
  labelLarge(t: Theme) {
    return css`
      ${helperContainerAndLabelCommonSizeMixin(t.tokenInputPaddingYLarge, t.tokenInputPaddingXLarge)}
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
      min-width: 0;
      max-width: 100%;
      width: 50px;
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
      ${inputSizeMixin(t.tokenLineHeightSmall, t.tokenMarginYSmall, t.tokenMarginXSmall)}
      ${inputAndHelperCommonStyles(
        t.tokenInputInputPaddingRightSmall,
        t.tokenPaddingXSmall,
        t.tokenInputLineHeightSmall,
        t.tokenInputFontSizeSmall,
      )};
    `;
  },
  inputMedium(t: Theme) {
    return css`
      ${inputSizeMixin(t.tokenLineHeightMedium, t.tokenMarginYMedium, t.tokenMarginXMedium)}
      ${inputAndHelperCommonStyles(
        t.tokenInputInputPaddingRightMedium,
        t.tokenPaddingXMedium,
        t.tokenInputLineHeightMedium,
        t.tokenInputFontSizeMedium,
      )};
    `;
  },
  inputLarge(t: Theme) {
    return css`
      ${inputSizeMixin(t.tokenLineHeightLarge, t.tokenMarginYLarge, t.tokenMarginXLarge)}
      ${inputAndHelperCommonStyles(
        t.tokenInputInputPaddingRightLarge,
        t.tokenPaddingXLarge,
        t.tokenInputLineHeightLarge,
        t.tokenInputFontSizeLarge,
      )};
    `;
  },

  helperContainer() {
    return css`
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      visibility: hidden;
    `;
  },
  helperContainerSmall(t: Theme) {
    return css`
      ${helperContainerAndLabelCommonSizeMixin(t.tokenInputPaddingYSmall, t.tokenInputPaddingXSmall)}
    `;
  },
  helperContainerMedium(t: Theme) {
    return css`
      ${helperContainerAndLabelCommonSizeMixin(t.tokenInputPaddingYMedium, t.tokenInputPaddingXMedium)}
    `;
  },
  helperContainerLarge(t: Theme) {
    return css`
      ${helperContainerAndLabelCommonSizeMixin(t.tokenInputPaddingYLarge, t.tokenInputPaddingXLarge)}
    `;
  },

  helperText() {
    return css`
      max-width: 100%;
      word-break: break-all;

      // don't collapse spaces
      // so they get counted in width
      white-space: pre-wrap;
    `;
  },
  helperTextSmall(t: Theme) {
    return css`
      ${inputAndHelperCommonStyles(
        t.tokenInputInputPaddingRightSmall,
        t.tokenInputInputPaddingLeft,
        t.tokenInputLineHeightSmall,
        t.tokenInputFontSizeSmall,
      )}; // заменить на размеры
    `;
  },
  helperTextMedium(t: Theme) {
    return css`
      ${inputAndHelperCommonStyles(
        t.tokenInputInputPaddingRightMedium,
        t.tokenInputInputPaddingLeft,
        t.tokenInputLineHeightMedium,
        t.tokenInputFontSizeMedium,
      )}; // заменить на размеры
    `;
  },
  helperTextLarge(t: Theme) {
    return css`
      ${inputAndHelperCommonStyles(
        t.tokenInputInputPaddingRightLarge,
        t.tokenInputInputPaddingLeft,
        t.tokenInputLineHeightLarge,
        t.tokenInputFontSizeLarge,
      )}; // заменить на размеры
    `;
  },

  helperTextEditing(t: Theme) {
    return css`
      padding-bottom: ${t.tokenLegacyTextShift};
    `;
  },
  helperTextEditingSmall(t: Theme) {
    return css`
      ${inputAndHelperCommonEditingStylesSizeMixin(
        t.tokenMarginYSmall,
        t.tokenMarginXSmall,
        t.tokenInputInputPaddingRightSmall,
        t.tokenInputInputPaddingLeft,
        t.tokenLineHeightSmall,
      )};
      ${helperTextEditingSizeMixin(t.tokenFontSizeSmall)}
    `;
  },
  helperTextEditingMedium(t: Theme) {
    return css`
      ${inputAndHelperCommonEditingStylesSizeMixin(
        t.tokenMarginYMedium,
        t.tokenMarginXMedium,
        t.tokenInputInputPaddingRightMedium,
        t.tokenInputInputPaddingLeft,
        t.tokenLineHeightMedium,
      )};
      ${helperTextEditingSizeMixin(t.tokenFontSizeMedium)}
    `;
  },
  helperTextEditingLarge(t: Theme) {
    return css`
      ${inputAndHelperCommonEditingStylesSizeMixin(
        t.tokenMarginYLarge,
        t.tokenMarginXLarge,
        t.tokenInputInputPaddingRightLarge,
        t.tokenInputInputPaddingLeft,
        t.tokenLineHeightLarge,
      )};
      ${helperTextEditingSizeMixin(t.tokenFontSizeLarge)}
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
  inputEditingSmall(t: Theme) {
    return css`
      ${inputAndHelperCommonEditingStylesSizeMixin(
        t.tokenMarginYSmall,
        t.tokenMarginXSmall,
        t.tokenInputInputPaddingRightSmall,
        t.tokenPaddingXSmall,
        t.tokenLineHeightSmall,
      )};
    `;
  },
  inputEditingMedium(t: Theme) {
    return css`
      ${inputAndHelperCommonEditingStylesSizeMixin(
        t.tokenMarginYMedium,
        t.tokenMarginXMedium,
        t.tokenInputInputPaddingRightMedium,
        t.tokenPaddingXMedium,
        t.tokenLineHeightMedium,
      )};
    `;
  },
  inputEditingLarge(t: Theme) {
    return css`
      ${inputAndHelperCommonEditingStylesSizeMixin(
        t.tokenMarginYLarge,
        t.tokenMarginXLarge,
        t.tokenInputInputPaddingRightLarge,
        t.tokenPaddingXLarge,
        t.tokenLineHeightLarge,
      )};
    `;
  },

  reservedInput(t: Theme) {
    return css`
      min-width: 2px;
      color: ${t.tokenInputTextColorDisabled};
      word-break: break-all;
    `;
  },
  reservedInputSmall(t: Theme) {
    return css`
      ${reservedInputSizeMixin(
        t.tokenInputLineHeightSmall,
        t.tokenInputFontSizeSmall,
        t.tokenMarginYSmall,
        t.tokenInputInputPaddingRightSmall,
        t.tokenInputInputPaddingLeft,
      )}
    `;
  },
  reservedInputMedium(t: Theme) {
    return css`
      ${reservedInputSizeMixin(
        t.tokenInputLineHeightMedium,
        t.tokenInputFontSizeMedium,
        t.tokenMarginYMedium,
        t.tokenInputInputPaddingRightMedium,
        t.tokenInputInputPaddingLeft,
      )}
    `;
  },
  reservedInputLarge(t: Theme) {
    return css`
      ${reservedInputSizeMixin(
        t.tokenInputLineHeightLarge,
        t.tokenInputFontSizeLarge,
        t.tokenMarginYLarge,
        t.tokenInputInputPaddingRightLarge,
        t.tokenInputInputPaddingLeft,
      )}
    `;
  },
});
