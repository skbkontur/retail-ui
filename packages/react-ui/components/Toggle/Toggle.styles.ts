import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    const disabled = cssName(styles.disabled(t));
    const handleWidthWithBorders = t.toggleHeight;
    const handleActiveWidth = `calc(${handleWidthWithBorders} - 2 * ${t.toggleBorderWidth} + ${t.toggleHandleActiveWidthIncrement})`;
    return css`
      display: inline-flex;
      cursor: pointer;

      &:hover:not(${disabled}) {
        ${cssName(styles.handle(t))} {
          background: ${t.toggleBgHover};
        }
      }
      &:active:not(${disabled}) ${cssName(styles.handle(t))} {
        width: ${handleActiveWidth};
      }
      &:active:not(${disabled}) ${cssName(styles.input(t))}:checked ~ ${cssName(styles.handle(t))} {
        transform: translateX(${t.toggleWidth}) translateX(-${handleWidthWithBorders})
          translateX(-${t.toggleHandleActiveWidthIncrement});
      }
    `;
  },

  handle(t: Theme) {
    const handleSize = `calc(${t.toggleHeight} - 2 * ${t.toggleBorderWidth})`;
    return css`
      background: ${t.toggleBg};
      border-radius: ${t.toggleHandleBorderRadius};
      bottom: ${t.toggleBorderWidth};
      box-shadow: 0 ${t.toggleBorderWidth} 0 0 rgba(0, 0, 0, 0.15), 0 0 0 ${t.toggleBorderWidth} rgba(0, 0, 0, 0.15);
      height: ${handleSize};
      left: ${t.toggleBorderWidth};
      position: absolute;
      top: ${t.toggleBorderWidth};
      transition: 0.2s ease-in;
      width: ${handleSize};
    `;
  },

  input(t: Theme) {
    const handleWidthWithBorders = t.toggleHeight;
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
        transform: translateX(${t.toggleWidth}) translateX(-${handleWidthWithBorders});
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
      box-shadow: 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.toggleOutlineWidth} ${t.toggleFocusShadowColor} !important;
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
      box-shadow: 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.toggleOutlineWidth} ${t.toggleShadowColorWarning};
    `;
  },

  isError(t: Theme) {
    return css`
      box-shadow: 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.toggleOutlineWidth} ${t.toggleShadowColorError};
    `;
  },

  outline(t: Theme) {
    return css`
      border-radius: ${t.toggleBorderRadius};
    `;
  },

  wrapper(t: Theme) {
    return css`
      display: inline-block;
      height: ${t.toggleHeight};
      position: relative;
      width: ${t.toggleWidth};
      flex: 1 0 ${t.toggleWidth};

      &::after {
        content: '';
        display: inline-block;
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      cursor: default !important;

      ${cssName(styles.container(t))} {
        background: ${t.toggleBgDisabled};
      }

      ${cssName(styles.wrapper(t))} {
        opacity: 0.3;
      }
    `;
  },

  rootLeft() {
    return css`
      flex-direction: row-reverse;
    `;
  },

  caption(t: Theme) {
    return css`
      padding: 0 0 0 ${t.toggleCaptionGap};
    `;
  },

  captionLeft(t: Theme) {
    return css`
      padding: 0 ${t.toggleCaptionGap} 0 0;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
