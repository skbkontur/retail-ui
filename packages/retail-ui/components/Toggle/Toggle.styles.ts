import { css } from '../../lib/theming/Emotion';
import styles from './Toggle.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  handle(t: ITheme) {
    return css`
      background: ${t.toggleBg};
    `;
  },

  container(t: ITheme) {
    return css`
      border: 1px solid ${t.toggleBorderColor};

      .${styles.isDisabled} & {
        background: ${t.toggleBgDisabled};
      }
      .${styles.input}:checked ~ & {
        border-color: ${t.toggleBgChecked};
        background: ${t.toggleBgChecked};
      }
    `;
  },

  focused(t: ITheme) {
    return css`
      .${styles.container}& {
        box-shadow: 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 3px ${t.toggleFocusShadowColor};
      }
    `;
  },

  activeBackground(t: ITheme) {
    return css`
      .${styles.isLoading} & {
        background: ${t.toggleBgChecked};
      }

      .${styles.input}:checked ~ .${styles.container} & {
        background: ${t.toggleBgChecked};
      }
    `;
  },

  isLoading(t: ITheme) {
    return css`
      .${styles.input}:checked ~ .${styles.container}& {
        background: ${t.toggleBorderColor};
        border-color: ${t.toggleBorderColor};
      }
    `;
  },

  isWarning(t: ITheme) {
    return css`
      .${styles.input}:checked ~ .${styles.container}& {
        background: ${t.toggleBgWarning};
        border-color: ${t.toggleBgWarning};

        .${styles.activeBackground} {
          background: ${t.toggleBgWarning};
        }
      }
    `;
  },

  isError(t: ITheme) {
    return css`
      .${styles.input}:checked ~ .${styles.container}& {
        background: ${t.toggleBgError};
        border-color: ${t.toggleBgError};

        .${styles.activeBackground} {
          background: ${t.toggleBgError};
        }
      }
    `;
  },

  wrapper(t: ITheme) {
    return css`
      &:hover {
        .${styles.handle} {
          background: ${t.toggleBgHover};
        }
      }
    `;
  },
};

export default jsStyles;
