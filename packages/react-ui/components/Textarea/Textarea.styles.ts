import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      display: inline-block;
      font-size: ${t.textareaFontSize};
      line-height: ${t.textareaLineHeight};
      position: relative;
    `;
  },

  textarea(t: Theme) {
    return css`
      -webkit-appearance: none;
      background-clip: padding-box;
      background: ${t.textareaBg};
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
      min-height: ${t.textareaMinHeight};
      outline: none;
      padding: ${t.textareaPaddingY} ${t.textareaPaddingX};
      transition: height 0.2s ease-out;
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
      &:disabled {
        color: ${t.textareaTextColorDisabled};
        background: ${t.textareaDisabledBg};
        border-color: ${t.textareaDisabledBorderColor};
        box-shadow: none;
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

  error(t: Theme) {
    return css`
      ${cssName(styles.textarea(t))}& {
        border-color: ${t.textareaBorderColorError};
        box-shadow: 0 0 0 ${t.textareaBorderWidth} ${t.textareaBorderColorError};
      }
      ${cssName(styles.textarea(t))}&:focus {
        border-color: ${t.textareaBorderColorError};
        box-shadow: 0 0 0 ${t.textareaOutlineWidth} ${t.textareaBorderColorError};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      ${cssName(styles.textarea(t))}& {
        border-color: ${t.textareaBorderColorWarning};
        box-shadow: 0 0 0 ${t.textareaOutlineWidth} ${t.textareaBorderColorWarning};
      }
      ${cssName(styles.textarea(t))}&:focus {
        border-color: ${t.textareaBorderColorWarning};
        box-shadow: 0 0 0 ${t.textareaOutlineWidth} ${t.textareaBorderColorWarning};
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
      right: ${t.textareaPaddingX};
      bottom: ${t.textareaPaddingY};
    `;
  },

  counterError(t: Theme) {
    return css`
      color: ${t.textareaCounterErrorColor} !important;
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
};

export const jsStyles = memoizeStyle(styles);
