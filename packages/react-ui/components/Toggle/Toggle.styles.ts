import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('toggle')({
  handle: 'handle',
  container: 'container',
  containerDisabled: 'container-disabled',
  containerLoading: 'container-loading',
  background: 'background',
});

export const styles = memoizeStyle({
  root(t: Theme) {
    const handleWidthWithBorders = t.toggleHeight;
    const handleActiveWidth = `calc(${handleWidthWithBorders} - 2 * ${t.toggleBorderWidth} + ${t.toggleHandleActiveWidthIncrement})`;
    return css`
      display: inline-flex;
      cursor: pointer;

      &:hover .${globalClasses.handle} {
        background: ${t.toggleBgHover};
      }
      &:active .${globalClasses.handle} {
        width: ${handleActiveWidth};
      }
      &:active input:checked ~ .${globalClasses.handle} {
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

  handleDisabled(t: Theme) {
    const handleSize = `calc(${t.toggleHeight} - 2 * ${t.toggleBorderWidth})`;
    return css`
      background: ${t.toggleDisabledHandleBg} !important; // override root hover/active styles
      width: ${handleSize} !important; // override root active styles
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
      &:checked ~ .${globalClasses.container} {
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBgChecked};
        background: ${t.toggleBgChecked};
        transition: background 0s 0.2s;
      }
      &:checked ~ .${globalClasses.containerDisabled} {
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleDisabledCheckedBorderColor};
        background: ${t.toggleDisabledCheckedBg};
        transition: background 0s 0.2s;
      }
      &:checked ~ .${globalClasses.containerLoading} {
        background: ${t.toggleBorderColor};
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBorderColor};
      }
      &:checked ~ .${globalClasses.container} .${globalClasses.background} {
        width: 70%;
        background: ${t.toggleBgChecked};
      }
      &:checked ~ .${globalClasses.containerDisabled} .${globalClasses.background} {
        width: 70%;
        background: ${t.toggleDisabledCheckedBg};
        border-radius: calc(${t.toggleHeight} * 0.5) 0 0 calc(${t.toggleHeight} * 0.5);
        box-shadow: inset 0 0 0 1px ${t.toggleDisabledCheckedBorderColor};
      }
      &:checked ~ .${globalClasses.handle} {
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

  containerDisabled(t: Theme) {
    return css`
      background: ${t.toggleBgDisabled};
    `;
  },

  focused(t: Theme) {
    return css`
      box-shadow: 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.toggleOutlineWidth} ${t.toggleFocusShadowColor};
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

  activeBackgroundLoading(t: Theme) {
    return css`
      background: ${t.toggleBgActive};
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
      background: ${t.toggleBaseBg};
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

  disabled() {
    return css`
      cursor: default;
    `;
  },

  rootLeft() {
    return css`
      flex-direction: row-reverse;
    `;
  },

  caption(t: Theme) {
    return css`
      color: ${t.toggleTextColor};
      padding: 0 0 0 ${t.toggleCaptionGap};
    `;
  },

  captionLeft(t: Theme) {
    return css`
      color: ${t.toggleTextColor};
      padding: 0 ${t.toggleCaptionGap} 0 0;
    `;
  },
});
