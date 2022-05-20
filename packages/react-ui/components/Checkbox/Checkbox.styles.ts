import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { isChrome } from '../../lib/client';

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

      &::before {
        // non-breaking space.
        // makes a correct space for absolutely positioned box,
        // and also height and baseline for checkbox without caption.
        content: '\\00A0';
        display: inline-block;
        width: ${t.checkboxBoxSize};
        flex: 0 0 auto;
      }
    `;
  },

  rootDisableTextSelect() {
    return css`
      user-select: none;
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

  boxWrapper(t: Theme) {
    const labGrotesqueCompenstation = parseInt(t.labGrotesqueBaselineCompensation);
    const fontSize = parseInt(t.checkboxFontSize);
    const baselineCompensation =
      fontSize < 16 && !isChrome
        ? labGrotesqueCompenstation
        : fontSize === 16 && isChrome
        ? -labGrotesqueCompenstation
        : 0;
    return css`
      position: absolute;
      width: ${t.checkboxBoxSize};
      height: ${t.checkboxBoxSize};
      box-sizing: border-box;
      padding: ${t.checkboxBorderWidth};
      margin-top: calc(${t.checkboxBoxOffsetY} + ${baselineCompensation}px);

      // fix position in ie11
      display: inline-block;
      left: 0;
    `;
  },

  box(t: Theme) {
    return css`
      color: ${t.checkboxTextColorDefault};
      box-shadow: ${t.checkboxShadow};
      background: ${t.checkboxBg};
      border-radius: ${t.checkboxBorderRadius};
      height: 100%;
    `;
  },

  input() {
    return css`
      display: inline-block;
      height: 0;
      opacity: 0;
      position: absolute;
      width: 0;
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

  icon(t: Theme) {
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
      padding-left: ${t.checkboxCaptionGap};
    `;
  },

  captionIE11() {
    return css`
      display: table-cell;
    `;
  },
});
