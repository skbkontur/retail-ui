import { css } from 'emotion';
import styles from './TokenInput.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  warning(t: ITheme) {
    return css`
      .${styles.root} .${styles.label}& {
        border: 1px solid ${t.borderColorWarning};
        box-shadow: 0 0 0 1px ${t.borderColorWarning};
      }
    `;
  },

  error(t: ITheme) {
    return css`
      .${styles.root} .${styles.label}& {
        border: 1px solid ${t.borderColorError};
        box-shadow: 0 0 0 1px ${t.borderColorError};
      }
    `;
  },

  label(t: ITheme) {
    return css`
      .${styles.root} & {
        background: ${t.bgDefault};
        border: 1px solid ${t.borderColorGrayLight};
        border-top-color: ${t.borderColorGrayDark};
      }
    `;
  },

  labelFocused(t: ITheme) {
    return css`
      .${styles.root} & {
        border: 1px solid ${t.borderColorFocus};
        box-shadow: 0 0 0 1px ${t.borderColorFocus};
      }
    `;
  },

  input(t: ITheme) {
    return css`
      .${styles.root} &::placeholder {
        color: ${t.placeholderColor};
      }
      .${styles.root} &:focus::placeholder {
        color: ${t.placeholderColorLight};
      }
    `;
  },
};

export default jsStyles;
