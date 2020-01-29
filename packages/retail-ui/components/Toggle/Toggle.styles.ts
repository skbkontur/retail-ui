import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import styles from './Toggle.module.less';

export const jsStyles = {
  handle(t: Theme) {
    return css`
      background: ${t.toggleBg};
    `;
  },

  container(t: Theme) {
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

  focused(t: Theme) {
    return css`
      .${styles.container}&, .${styles.input}:checked ~ & {
        box-shadow: 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 3px ${t.toggleFocusShadowColor};
      }
    `;
  },

  activeBackground(t: Theme) {
    return css`
      .${styles.isLoading} & {
        background: ${t.toggleBgActive};
      }

      .${styles.input}:checked ~ .${styles.container} & {
        background: ${t.toggleBgChecked};
      }
    `;
  },

  isLoading(t: Theme) {
    return css`
      .${styles.input}:checked ~ .${styles.container}& {
        background: ${t.toggleBorderColor};
        box-shadow: inset 0 0 0 1px ${t.toggleBorderColor};
      }
    `;
  },

  isWarning(t: Theme) {
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

  isError(t: Theme) {
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

  wrapper(t: Theme) {
    return css`
      &:hover:not(.${styles.isDisabled}) {
        .${styles.handle} {
          background: ${t.toggleBgHover};
        }
      }
    `;
  },
};
