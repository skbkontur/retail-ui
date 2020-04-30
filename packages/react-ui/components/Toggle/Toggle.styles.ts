import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  handle(t: Theme) {
    return css`
      background: ${t.toggleBg};
      border-radius: ${t.toggleSwitcherBorderRadius};
      bottom: ${t.toggleBorderWidth};
      box-shadow: 0 ${t.toggleBorderWidth} 0 0 rgba(0, 0, 0, 0.15), 0 0 0 ${t.toggleBorderWidth} rgba(0, 0, 0, 0.15);
      height: ${t.toggleSwitcherSize};
      left: ${t.toggleBorderWidth};
      position: absolute;
      top: ${t.toggleBorderWidth};
      transition: 0.2s ease-in;
      width: ${t.toggleSwitcherSize};
    `;
  },

  input(t: Theme) {
    return css`
      position: absolute;
      opacity: 0;

      &:focus {
        outline: none;
      }
      &:checked ~ ${cssName(styles.container(t))} {
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBgChecked};
        background: ${t.toggleBgChecked};
        transition: background 0s 0.2s;
      }
      &:checked ~ ${cssName(styles.container(t))} ${cssName(styles.activeBackground())} {
        width: 70%;
        background: ${t.toggleBgChecked};
      }
      &:checked ~ ${cssName(styles.handle(t))} {
        transform: translateX(14px);
      }
    `;
  },

  container(t: Theme) {
    return css`
      border-radius: ${t.toggleBorderRadius};
      box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBorderColor};
      height: 100%;
      overflow: hidden;
      position: absolute;
      width: 100%;
      /* fixes overflow issue in Safari: https://bugs.webkit.org/show_bug.cgi?id=98538 */
      z-index: 0;
    `;
  },

  focused(t: Theme) {
    return css`
      ${cssName(styles.container(t))}&, ${cssName(styles.input(t))}:checked ~ & {
        box-shadow: 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 3px ${t.toggleFocusShadowColor};
      }
    `;
  },

  activeBackground() {
    return css`
      background: inherit;
      bottom: 0;
      left: 0;
      position: absolute;
      top: 0;
      transition: 0.2s ease-in;
      width: 10px;
    `;
  },

  isLoading(t: Theme) {
    return css`
      ${cssName(styles.input(t))}:checked ~ ${cssName(styles.container(t))}& {
        background: ${t.toggleBorderColor};
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBorderColor};
      }
      ${cssName(styles.activeBackground())} {
        background: ${t.toggleBgActive};
      }
    `;
  },

  isWarning(t: Theme) {
    return css`
      ${cssName(styles.input(t))}:checked ~ ${cssName(styles.container(t))}& {
        background: ${t.toggleBgWarning};
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBgWarning};

        ${cssName(styles.activeBackground())} {
          background: ${t.toggleBgWarning};
        }
      }
    `;
  },

  isError(t: Theme) {
    return css`
      ${cssName(styles.input(t))}:checked ~ ${cssName(styles.container(t))}& {
        background: ${t.toggleBgError};
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBgError};

        ${cssName(styles.activeBackground())} {
          background: ${t.toggleBgError};
        }
      }
    `;
  },

  wrapper(t: Theme) {
    const wrapperDisabled = cssName(styles.wrapperDisabled(t));
    return css`
      cursor: pointer;
      display: inline-block;
      height: ${t.toggleHeight};
      position: relative;
      width: ${t.toggleWidth};

      &:hover:not(${wrapperDisabled}) {
        ${cssName(styles.handle(t))} {
          background: ${t.toggleBgHover};
        }
      }
      &::after {
        content: '';
        display: inline-block;
      }
      &:active:not(${wrapperDisabled}) ${cssName(styles.handle(t))} {
        width: 22px;
      }
      &:active:not(${wrapperDisabled}) ${cssName(styles.input(t))}:checked ~ ${cssName(styles.handle(t))} {
        transform: translateX(10px);
      }
    `;
  },

  wrapperDisabled(t: Theme) {
    return css`
      opacity: 0.3;
      cursor: default;

      ${cssName(styles.container(t))} {
        background: ${t.toggleBgDisabled};
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
