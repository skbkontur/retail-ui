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
        box-shadow: inset ${t.checkboxShadowHover};
      }

      &:active .${globalClasses.box} {
        box-shadow: inset ${t.checkboxShadowActive};
        background: ${t.checkboxActiveBg};
      }

      &::after {
        // non-breaking space to make a correct
        // baseline without caption
        content: '\\00A0';
        width: 0;
      }
    `;
  },

  rootChecked(t: Theme) {
    return css`
      &:hover .${globalClasses.box} {
        box-shadow: inset ${t.checkboxCheckedHoverShadow};
        background: ${t.checkboxCheckedHoverBg};
      }

      &:active .${globalClasses.box} {
        background: ${t.checkboxCheckedActiveBg};
        box-shadow: inset ${t.checkboxCheckedActiveShadow};
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
    return css`
      position: absolute;
      left: 0;
      justify-content: center;
      box-sizing: border-box;
      width: ${t.checkboxBoxSize};
      height: ${t.checkboxBoxSize};
      flex: none;
      font-size: ${t.checkboxFontSize};
      color: ${t.checkboxTextColorDefault};
      border: ${t.checkboxBorder};
      border-radius: ${t.checkboxBorderRadius};
      box-shadow: inset ${t.checkboxShadow};
      background: ${t.checkboxBg};
      margin-top: ${t.checkboxBoxOffsetY};
    `;
  },

  input(t: Theme) {
    return css`
      display: inline-block;
      opacity: 0;
      width: ${t.checkboxBoxSize};
      height: 0;
      margin: 0;
      z-index: -1;
      flex: 0 0 auto;
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
      box-shadow: inset ${t.checkboxCheckedShadow};
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
      box-shadow: inset ${t.checkboxShadowDisabled} !important; // override hover and active
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

  icon() {
    return css`
      position: absolute;
      top: 0px;
      bottom: 0px;
      right: 0px;
      left: 0px;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin: -12.5% 0 0 0;
      }
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
      padding-left: ${t.checkboxLabelGap};
    `;
  },

  captionIE11() {
    return css`
      display: table-cell;
    `;
  },
});
