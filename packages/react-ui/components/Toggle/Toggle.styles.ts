import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClassNames = {
  handle: 'react-ui-handle',
  container: 'react-ui-container',
  containerLoading: 'react-ui-container-loading',
  background: 'react-ui-background',
};

export const styles = memoizeStyle({
  root(t: Theme) {
    const handleWidthWithBorders = t.toggleHeight;
    const handleActiveWidth = `calc(${handleWidthWithBorders} - 2 * ${t.toggleBorderWidth} + ${t.toggleHandleActiveWidthIncrement})`;
    return css`
      display: inline-flex;
      cursor: pointer;

      &:hover .${globalClassNames.handle} {
        background: ${t.toggleBgHover};
      }
      &:active .${globalClassNames.handle} {
        width: ${handleActiveWidth};
      }
      &:active input:checked ~ .${globalClassNames.handle} {
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
      background: ${t.toggleBg} !important; // override root hover/active styles
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
      &:checked ~ .${globalClassNames.container} {
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBgChecked};
        background: ${t.toggleBgChecked};
        transition: background 0s 0.2s;
      }
      &:checked ~ .${globalClassNames.containerLoading} {
        background: ${t.toggleBorderColor};
        box-shadow: inset 0 0 0 ${t.toggleBorderWidth} ${t.toggleBorderColor};
      }
      &:checked ~ .${globalClassNames.container} .${globalClassNames.background} {
        width: 70%;
        background: ${t.toggleBgChecked};
      }
      &:checked ~ .${globalClassNames.handle} {
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

  wrapperDisabled() {
    return css`
      opacity: 0.3;
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
      padding: 0 0 0 ${t.toggleCaptionGap};
    `;
  },

  captionLeft(t: Theme) {
    return css`
      padding: 0 ${t.toggleCaptionGap} 0 0;
    `;
  },
});
