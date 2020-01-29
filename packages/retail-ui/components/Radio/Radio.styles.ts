import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import styles from './Radio.module.less';

export const jsStyles = {
  radio(t: Theme) {
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

  focus(t: Theme) {
    return css`
      &::after {
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorFocus};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &::after {
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &::after {
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorError};
      }
    `;
  },

  checked(t: Theme) {
    return css`
      .${styles.root} .${styles.radio}& {
        background-color: ${t.radioCheckedBgColor};
      }
      .${styles.root} .${styles.radio}&::before {
        background: ${t.radioCheckedBulletColor};
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      box-shadow: ${t.radioDisabledShadow} !important;
    `;
  },

  label(t: Theme) {
    return css`
      display: ${t.radioLabelDisplay};
    `;
  },
};
