import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { counterSizeMixin, rootTextareaSizeMixin, textareaSizeMixin } from './Textarea.mixins';

export const styles = memoizeStyle({
  root() {
    return css`
      display: inline-block;
      position: relative;
    `;
  },
  rootSmall(t: Theme) {
    return css`
      ${rootTextareaSizeMixin(t.textareaFontSizeSmall, t.textareaLineHeightSmall)};
    `;
  },
  rootMedium(t: Theme) {
    return css`
      ${rootTextareaSizeMixin(t.textareaFontSizeMedium, t.textareaLineHeightMedium)};
    `;
  },
  rootLarge(t: Theme) {
    return css`
      ${rootTextareaSizeMixin(t.textareaFontSizeLarge, t.textareaLineHeightLarge)};
    `;
  },

  textarea(t: Theme) {
    return css`
      -webkit-appearance: none;
      background: ${t.textareaBg};
      background-clip: ${t.textareaBackgroundClip};
      border: ${t.textareaBorderWidth} solid ${t.textareaBorderColor};
      border-top-color: ${t.textareaBorderTopColor};
      box-shadow: ${t.textareaShadow};
      box-sizing: border-box;
      color: ${t.textareaColor};
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      max-width: 100%;
      min-width: ${t.textareaWidth};
      outline: none;
      transition: border-color ${t.transitionDuration} ${t.transitionTimingFunction}, height 0.2s ease-out;
      vertical-align: middle;
      width: 100%;
      border-radius: ${t.textareaBorderRadius};
      white-space: pre-wrap;

      &:focus {
        border-color: ${t.textareaBorderColorFocus};
        box-shadow: 0 0 0 ${t.textareaOutlineWidth} ${t.textareaBorderColorFocus};
        position: relative;
        z-index: 2;

        &::placeholder {
          color: ${t.textareaPlaceholderColorLight};
        }
      }

      &::placeholder {
        color: ${t.textareaPlaceholderColor};
      }

      &:-moz-placeholder {
        color: ${t.textareaPlaceholderColor};
      }

      &::-moz-placeholder {
        color: ${t.textareaPlaceholderColor};
      }
    `;
  },
  textareaSmall(t: Theme) {
    return css`
      ${textareaSizeMixin(t.textareaPaddingYSmall, t.textareaPaddingXSmall, t.textareaMinHeightSmall)};
    `;
  },
  textareaMedium(t: Theme) {
    return css`
      ${textareaSizeMixin(t.textareaPaddingYMedium, t.textareaPaddingXMedium, t.textareaMinHeightMedium)};
    `;
  },
  textareaLarge(t: Theme) {
    return css`
      ${textareaSizeMixin(t.textareaPaddingYLarge, t.textareaPaddingXLarge, t.textareaMinHeightLarge)};
    `;
  },

  hovering(t: Theme) {
    return css`
      &:enabled:hover:not(:focus) {
        border-color: ${t.textareaBorderColorHover};
      }
    `;
  },

  error(t: Theme) {
    return css`
      border-color: ${t.textareaBorderColorError};
      box-shadow: 0 0 0 ${t.textareaBorderWidth} ${t.textareaBorderColorError};

      &:focus {
        border-color: ${t.textareaBorderColorError};
        box-shadow: 0 0 0 ${t.textareaOutlineWidth} ${t.textareaBorderColorError};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      border-color: ${t.textareaBorderColorWarning};
      box-shadow: 0 0 0 ${t.textareaOutlineWidth} ${t.textareaBorderColorWarning};

      &:focus {
        border-color: ${t.textareaBorderColorWarning};
        box-shadow: 0 0 0 ${t.textareaOutlineWidth} ${t.textareaBorderColorWarning};
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      color: ${t.textareaTextColorDisabled};
      background: ${t.textareaDisabledBg};
      border-color: ${t.textareaDisabledBorderColor};
      box-shadow: none;

      &::placeholder {
        color: ${t.textareaPlaceholderColorDisabled};
      }
    `;
  },

  fake() {
    return css`
      height: 0;
      left: 0;
      position: absolute;
      top: 0;
      visibility: hidden;
      width: 100%;
    `;
  },

  placeholder() {
    return css`
      -ms-user-select: none;
      color: #aaa;
      left: 12px;
      overflow: hidden;
      position: absolute;
      right: 12px;
      top: 9px;
      user-select: none;
      z-index: 3;
    `;
  },

  counterContainer(t: Theme) {
    return css`
      position: absolute;
      top: 0;
      border: ${t.textareaBorderWidth} solid transparent;
      box-sizing: content-box;
    `;
  },

  counter(t: Theme) {
    return css`
      position: absolute;
      z-index: 3;
      text-align: right;
      background: ${t.textareaCounterBg};
      color: ${t.textareaCounterColor};
      border-radius: 2px;
    `;
  },
  counterSmall(t: Theme) {
    return css`
      ${counterSizeMixin(t.textareaPaddingYSmall, t.textareaPaddingXSmall)};
    `;
  },
  counterMedium(t: Theme) {
    return css`
      ${counterSizeMixin(t.textareaPaddingYMedium, t.textareaPaddingXMedium)};
    `;
  },
  counterLarge(t: Theme) {
    return css`
      ${counterSizeMixin(t.textareaPaddingYLarge, t.textareaPaddingXLarge)};
    `;
  },

  counterError(t: Theme) {
    return css`
      color: ${t.textareaCounterErrorColor};
    `;
  },

  counterHelp() {
    return css`
      margin-left: 4px;
      cursor: pointer;
    `;
  },

  disableAnimations() {
    return css`
      transition: none;
    `;
  },
});
