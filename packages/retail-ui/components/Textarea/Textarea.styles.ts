import { css } from '../../lib/theming/Emotion';
import styles from './Textarea.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
    return css`
      font-size: ${t.fontSizeMedium};
      line-height: ${t.textareaLineHeight};
    `;
  },
  textarea(t: ITheme) {
    return css`
      background: ${t.textareaBg};
      border: 1px solid ${t.borderColorGrayLight};
      border-top-color: ${t.textareaBorderTopColor};
      color: ${t.textareaColor};
      min-height: ${t.controlHeightSmall};
      box-shadow: ${t.textareaShadow};

      &:focus {
        border-color: ${t.borderColorFocus};
        box-shadow: 0 0 0 1px ${t.borderColorFocus};

        &::placeholder {
          color: ${t.placeholderColorLight};
        }
      }
      &:disabled {
        color: ${t.textColorDisabled};
        background: ${t.textareaDisabledBg};
        border-color: ${t.textareaDisabledBorderColor};
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

  error(t: ITheme) {
    return css`
      .${styles.textarea}& {
        border-color: ${t.borderColorError};
        box-shadow: 0 0 0 1px ${t.borderColorError};
      }
      .${styles.textarea}&:focus {
        border-color: ${t.borderColorError};
        box-shadow: 0 0 0 1px ${t.borderColorError};
      }
    `;
  },

  warning(t: ITheme) {
    return css`
      .${styles.textarea}& {
        border-color: ${t.borderColorWarning};
        box-shadow: 0 0 0 1px ${t.borderColorWarning};
      }
      .${styles.textarea}&:focus {
        border-color: ${t.borderColorWarning};
        box-shadow: 0 0 0 1px ${t.borderColorWarning};
      }
    `;
  },
};

export default jsStyles;
