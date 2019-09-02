import { css } from '../../lib/theming/Emotion';
import styles from './Toggle.module.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  handle(t: ITheme) {
    return css`
      background: ${t.toggleBg};
    `;
  },

  container(t: ITheme) {
    return css`
      box-shadow: inset 0 0 0 1px ${t.toggleBorderColor};

      .${styles.isDisabled} & {
        background: ${t.toggleBgDisabled};
      }
      .${styles.input}:checked ~ & {
        box-shadow: inset 0 0 0 1px ${t.toggleBgChecked};
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
        background: ${t.toggleBgActive};
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
        box-shadow: inset 0 0 0 1px ${t.toggleBorderColor};
      }
    `;
  },

  isWarning(t: ITheme) {
    return css`
      .${styles.input}:checked ~ .${styles.container}& {
        background: ${t.toggleBgWarning};
        box-shadow: inset 0 0 0 1px ${t.toggleBgWarning};

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
        box-shadow: inset 0 0 0 1px ${t.toggleBgError};

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
