import { css } from '../../lib/theming/Emotion';
import styles from './TokenInput.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  label(t: ITheme) {
    return css`
      background-color: ${t.inputBg};
      border: ${t.inputBorderWidth} solid ${t.borderColorGrayLight};
      border-top-color: ${t.borderColorGrayDark};
    `;
  },

  warning(t: ITheme) {
    return css`
      border: 1px solid ${t.borderColorWarning};
      box-shadow: 0 0 0 1px ${t.borderColorWarning};
    `;
  },

  error(t: ITheme) {
    return css`
      border: 1px solid ${t.borderColorError};
      box-shadow: 0 0 0 1px ${t.borderColorError};
    `;
  },

  labelFocused(t: ITheme) {
    return css`
      border: 1px solid ${t.borderColorFocus};
      box-shadow: 0 0 0 1px ${t.borderColorFocus};
    `;
  },

  labelDisabled(t: ITheme) {
    return css`
      background: ${t.bgDisabled};
      border-color: ${t.borderColorGrayLight};
    `;
  },

  input(t: ITheme) {
    return css`
      .${styles.root} &::placeholder {
        color: ${t.placeholderColor};
        -webkit-text-fill-color: ${t.placeholderColor};
      }
      .${styles.root} &:focus::placeholder {
        color: ${t.placeholderColorLight};
        -webkit-text-fill-color: ${t.placeholderColorLight};
      }
    `;
  },

  inputDisabled(t: ITheme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },
};

export default jsStyles;
