import { css } from 'emotion';
import styles from './Radio.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  radio(t: ITheme) {
    return css`
      width: ${t.radioSize};
      height: ${t.radioSize};
      vertical-align: ${t.radioVerticalAlign};
      background-image: ${t.radioBgImage};
      box-shadow: ${t.radioBoxShadow};
      border: ${t.radioBorder};

      .${styles.root}:hover & {
        background: ${t.radioHoverBg};
        box-shadow: ${t.radioHoverShadow};
      }
      .${styles.root}:active & {
        background: ${t.radioActiveBg};
        box-shadow: ${t.radioActiveShadow};
      }
      .${styles.input}:focus + &::after {
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorFocus};
      }
    `;
  },

  focus(t: ITheme) {
    return css`
      &::after {
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorFocus};
      }
    `;
  },

  warning(t: ITheme) {
    return css`
      &::after {
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.warningMain};
      }
    `;
  },

  error(t: ITheme) {
    return css`
      &::after {
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorError};
      }
    `;
  },

  checked(t: ITheme) {
    return css`
      .${styles.root} .${styles.radio}& {
        background-color: ${t.radioCheckedBgColor};
      }
      .${styles.root} .${styles.radio}&::before {
        background: ${t.radioCheckedBulletColor};
      }
    `;
  },

  disabled(t: ITheme) {
    return css`
      box-shadow: ${t.radioDisabledShadow} !important;
    `;
  },

  label(t: ITheme) {
    return css`
      display: ${t.radioLabelDisplay};
    `;
  },
};

export default jsStyles;
