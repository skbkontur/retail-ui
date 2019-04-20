import { css } from 'emotion';
import styles from './Textarea.less';
import { ITheme } from '../../lib/ThemeManager';

const jsStyles = {
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
        &:-moz-placeholder {
          color: ${t.placeholderColorLight};
        }
        &::-moz-placeholder {
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
        color: ${t.placeholderColor};
      }
      &::-moz-placeholder {
        color: ${t.placeholderColor};
      }
    `;
  },

  error(t: ITheme) {
    return css`
      .${styles.textarea}& {
        border-color: ${t.errorMain};
        box-shadow: 0 0 0 1px ${t.errorMain};
      }
      .${styles.textarea}&:focus {
        border-color: ${t.errorMain};
        box-shadow: 0 0 0 1px ${t.errorMain};
      }
    `;
  },

  warning(t: ITheme) {
    return css`
      .${styles.textarea}& {
        border-color: ${t.warningMain};
        box-shadow: 0 0 0 1px ${t.warningMain};
      }
      .${styles.textarea}&:focus {
        border-color: ${t.warningMain};
        box-shadow: 0 0 0 1px ${t.warningMain};
      }
    `;
  },
};

export default jsStyles;
