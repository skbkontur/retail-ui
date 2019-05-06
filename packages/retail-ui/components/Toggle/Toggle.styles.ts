import { css } from 'emotion';
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
      .${jsStyles.isLoading(t)} & {
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
        background: ${t.warningMain};
        border-color: ${t.warningMain};

        .${jsStyles.activeBackground(t)} {
          background: ${t.warningMain};
        }
      }
    `;
  },

  isError(t: ITheme) {
    return css`
      .${styles.input}:checked ~ .${styles.container}& {
        background: ${t.errorMain};
        border-color: ${t.errorMain};

        .${jsStyles.activeBackground(t)} {
          background: ${t.errorMain};
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
