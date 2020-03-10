import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      display: inline-block;
      font-size: ${t.fontSizeMedium};
      line-height: ${t.textareaLineHeight};
      position: relative;
    `;
  },

  textarea(t: Theme) {
    return css`
      -webkit-appearance: none;
      background-clip: padding-box;
      background: ${t.textareaBg};
      border: 1px solid ${t.borderColorGrayLight};
      border-top-color: ${t.textareaBorderTopColor};
      box-shadow: ${t.textareaShadow};
      box-sizing: border-box;
      color: ${t.textareaColor};
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      max-width: 100%;
      min-height: ${t.controlHeightSmall};
      outline: none;
      padding: 6px 10px;
      transition: height 0.2s ease-out;
      vertical-align: middle;
      width: 100%;

      &:focus {
        border-color: ${t.borderColorFocus};
        box-shadow: 0 0 0 1px ${t.borderColorFocus};
        position: relative;
        z-index: 2;

        &::placeholder {
          color: ${t.placeholderColorLight};
        }
      }
      &:disabled {
        color: ${t.textColorDisabled};
        background: ${t.textareaDisabledBg};
        border-color: ${t.textareaDisabledBorderColor};
        box-shadow: none;
      }

      &::placeholder {
        color: ${t.placeholderColor};
      }

      &:-moz-placeholder {
        color: inherit; // Need to be discussed
      }

      &::-moz-placeholder {
        color: inherit;
      }
    `;
  },

  error(t: Theme) {
    return css`
      ${cssName(styles.textarea(t))}& {
        border-color: ${t.borderColorError};
        box-shadow: 0 0 0 1px ${t.borderColorError};
      }
      ${cssName(styles.textarea(t))}&:focus {
        border-color: ${t.borderColorError};
        box-shadow: 0 0 0 1px ${t.borderColorError};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      ${cssName(styles.textarea(t))}& {
        border-color: ${t.borderColorWarning};
        box-shadow: 0 0 0 1px ${t.borderColorWarning};
      }
      ${cssName(styles.textarea(t))}&:focus {
        border-color: ${t.borderColorWarning};
        box-shadow: 0 0 0 1px ${t.borderColorWarning};
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
};

export const jsStyles = memoizeStyle(styles);
