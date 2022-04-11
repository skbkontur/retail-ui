import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { isChrome } from '../../lib/client';

export const globalClasses = prefix('toggle')({
  handle: 'handle',
  container: 'container',
  disabled: 'disabled',
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
      align-items: baseline;
      position: relative;
      line-height: ${t.toggleLineHeight};
      font-size: ${t.toggleFontSize};

      &:hover .${globalClasses.handle} {
        background: ${t.toggleBgHover};
      }
      &:active:not(.${globalClasses.disabled}) .${globalClasses.handle} {
        width: ${handleActiveWidth};
      }
      &:active:not(.${globalClasses.disabled}) input:checked ~ .${globalClasses.handle} {
        transform: translateX(${t.toggleWidth}) translateX(-${handleWidthWithBorders})
          translateX(-${t.toggleHandleActiveWidthIncrement});
      }

      &::before {
        // non-breaking space.
        // makes a correct space for absolutely positioned button,
        // and also height and baseline for toggle without caption.
        content: '\\00A0';
        display: inline-block;
        width: ${t.toggleWidth};
        flex: 0 0 auto;
      }
    `;
  },

  handle(t: Theme) {
    return css`
      background: ${t.toggleBg};
      border-radius: ${t.toggleHandleBorderRadius};
      box-shadow: 0 ${t.toggleBorderWidth} 0 0 rgba(0, 0, 0, 0.15), 0 0 0 ${t.toggleBorderWidth} rgba(0, 0, 0, 0.15);
      height: ${t.toggleHandleSize};
      left: ${t.toggleHandleLeft};
      position: absolute;
      top: ${t.toggleHandleTop};
      transition: 0.2s ease-in;
      width: ${t.toggleHandleSize};
    `;
  },

  handleDisabled(t: Theme) {
    return css`
      background: ${t.toggleDisabledHandleBg} !important; // override root hover/active styles
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
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBorderColorDisabledChecked};
        background: ${t.toggleBgDisabledChecked};
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
        background: ${t.toggleBgDisabledChecked};
        border-radius: calc(${t.toggleHeight} * 0.5) 0 0 calc(${t.toggleHeight} * 0.5);
        box-shadow: inset 0 0 0 1px ${t.toggleBorderColorDisabledChecked};
      }
      &:checked ~ .${globalClasses.handle} {
        transform: translateX(${t.toggleWidth}) translateX(-${handleWidthWithBorders});
        background: ${t.toggleHandleBgActive};
        height: ${t.toggleHandleCheckedHeight};
        top: ${t.toggleHandleCheckedTop};
        width: ${t.toggleHandleCheckedWidth};
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
      box-shadow: inset 0 0 0 1px ${t.toggleBorderColorDisabled};
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

  disabledBackground(t: Theme) {
    return css`
      box-shadow: inset 0 0 0 1px ${t.toggleBorderColorDisabled};
      width: 0;
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

  button(t: Theme) {
    const labGrotesqueCompenstation = parseInt(t.labGrotesqueBaselineCompensation);
    const fontSize = parseInt(t.checkboxFontSize);
    const baselineCompensation = fontSize <= 16 && isChrome ? -labGrotesqueCompenstation : 0;
    return css`
      position: absolute;
      left: 0;
      top: 0;
      height: ${t.toggleHeight};
      width: ${t.toggleWidth};
      flex: 1 0 ${t.toggleWidth};

      background: ${t.toggleBaseBg};
      border-radius: ${t.toggleBorderRadius};
      line-height: ${t.toggleHeight};

      margin-top: calc(${t.toggleButtonOffsetY} + ${baselineCompensation}px);
    `;
  },

  buttonRight() {
    return css`
      right: 0;
      left: auto;
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
      line-height: ${t.toggleLineHeight};
      font-size: ${t.toggleFontSize};
    `;
  },

  disabledCaption(t: Theme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },

  captionLeft(t: Theme) {
    return css`
      color: ${t.toggleTextColor};
      padding: 0 ${t.toggleCaptionGap} 0 0;
    `;
  },
});
