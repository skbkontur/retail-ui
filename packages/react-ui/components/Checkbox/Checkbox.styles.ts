import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('checkbox')({
  box: 'box',
});

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      display: inline-flex;
      align-items: baseline;
      cursor: pointer;
      position: relative;
      line-height: ${t.checkboxLineHeight};
      font-size: ${t.checkboxFontSize};
      padding: ${t.checkboxPaddingY} 0;

      &:hover .${globalClasses.box} {
        background: ${t.checkboxHoverBg};
        box-shadow: ${t.checkboxShadowHover};
      }

      &:active .${globalClasses.box} {
        box-shadow: ${t.checkboxShadowActive};
        background: ${t.checkboxActiveBg};
      }
    `;
  },

  rootChecked(t: Theme) {
    return css`
      &:hover .${globalClasses.box} {
        box-shadow: ${t.checkboxCheckedHoverShadow};
        background: ${t.checkboxCheckedHoverBg};
      }

      &:active .${globalClasses.box} {
        background: ${t.checkboxCheckedActiveBg};
        box-shadow: ${t.checkboxCheckedActiveShadow};
      }
    `;
  },

  rootFallback() {
    return css`
      display: inline-table;

      & > * {
        // fix root's :active state in IE11 that gets blocked by nested elements
        pointer-events: none;
      }
    `;
  },

  rootWrapperIE11() {
    return css`
      display: inline;
    `;
  },

  box(t: Theme) {
    const boxSize = `calc(${t.checkboxBoxSize} - 2 * ${t.checkboxBorderWidthCompensation})`;
    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: ${boxSize};
      height: ${boxSize};
      flex: none;
      font-size: ${t.checkboxFontSize};
      color: ${t.checkboxTextColorDefault};
      border: ${t.checkboxBorder};
      border-radius: ${t.checkboxBorderRadius};
      box-shadow: ${t.checkboxShadow};
      background: ${t.checkboxBg};
      align-self: baseline;
      margin: ${t.checkboxBorderWidthCompensation};
    `;
  },

  input() {
    return css`
      display: inline-block;
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
      z-index: -1;
    `;
  },

  boxWarning(t: Theme) {
    return css`
      box-shadow: inset 0 0 0 1px ${t.checkboxOutlineColorFocus},
        0 0 0 ${t.checkboxOutlineWidth} ${t.checkboxBorderColorWarning} !important; // override hover and active
    `;
  },

  boxError(t: Theme) {
    return css`
      box-shadow: inset 0 0 0 1px ${t.checkboxOutlineColorFocus},
        0 0 0 ${t.checkboxOutlineWidth} ${t.checkboxBorderColorError} !important; // override hover and active
    `;
  },

  boxChecked(t: Theme) {
    return css`
      background: ${t.checkboxCheckedBg};
      color: ${t.checkboxCheckedColor};
      box-shadow: ${t.checkboxCheckedShadow};
    `;
  },

  boxFocus(t: Theme) {
    return css`
      box-shadow: inset 0 0 0 1px ${t.checkboxOutlineColorFocus},
        0 0 0 ${t.checkboxOutlineWidth} ${t.checkboxBorderColorFocus} !important; // override hover and active
    `;
  },

  boxDisabled(t: Theme) {
    return css`
      box-shadow: ${t.checkboxShadowDisabled} !important; // override hover and active
      background: ${t.checkboxBgDisabled} !important; // override hover and active
      color: ${t.checkboxTextColorDisabled};
    `;
  },

  disabled(t: Theme) {
    return css`
      color: ${t.checkboxTextColorDisabled};
      cursor: default;
    `;
  },

  iconFixBaseline() {
    return css`
      margin-top: -2px;
    `;
  },

  iconUnchecked() {
    return css`
      color: transparent;
    `;
  },

  caption(t: Theme) {
    return css`
      color: ${t.checkboxTextColorDefault};
      padding-left: ${t.checkboxCaptionGap};
    `;
  },

  captionIE11() {
    return css`
      display: table-cell;
    `;
  },
});
