import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { boxMixin, boxWrapperMixin, checkboxSizeMixin } from './Checkbox.mixins';

export const globalClasses = prefix('checkbox')({
  box: 'box',
});

export const styles = memoizeStyle({
  rootSmall(t: Theme) {
    return css`
      ${checkboxSizeMixin(
        t.checkboxFontSizeSmall,
        t.checkboxLineHeightSmall,
        t.checkboxPaddingYSmall,
        t.checkboxBoxSizeSmall,
      )};

      ${boxMixin(
        t.transitionDuration,
        t.transitionTimingFunction,
        t.checkboxHoverBg,
        t.checkboxShadowHover,
        t.checkboxShadowActive,
        t.checkboxActiveBg,
      )};
    `;
  },

  rootMedium(t: Theme) {
    return css`
      ${checkboxSizeMixin(
        t.checkboxFontSizeMedium,
        t.checkboxLineHeightMedium,
        t.checkboxPaddingYMedium,
        t.checkboxBoxSizeMedium,
      )};

      ${boxMixin(
        t.transitionDuration,
        t.transitionTimingFunction,
        t.checkboxHoverBg,
        t.checkboxShadowHover,
        t.checkboxShadowActive,
        t.checkboxActiveBg,
      )};
    `;
  },

  rootLarge(t: Theme) {
    return css`
      ${checkboxSizeMixin(
        t.checkboxFontSizeLarge,
        t.checkboxLineHeightLarge,
        t.checkboxPaddingYLarge,
        t.checkboxBoxSizeLarge,
      )};

      ${boxMixin(
        t.transitionDuration,
        t.transitionTimingFunction,
        t.checkboxHoverBg,
        t.checkboxShadowHover,
        t.checkboxShadowActive,
        t.checkboxActiveBg,
      )};
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

  boxWrapperSmall(t: Theme) {
    return css`
      ${boxWrapperMixin(
        t.labGrotesqueBaselineCompensation,
        t.checkboxFontSizeSmall,
        t.checkboxBoxSizeSmall,
        t.checkboxBorderWidth,
        t.checkboxBoxOffsetY,
      )};
    `;
  },

  boxWrapperMedium(t: Theme) {
    return css`
      ${boxWrapperMixin(
        t.labGrotesqueBaselineCompensation,
        t.checkboxFontSizeMedium,
        t.checkboxBoxSizeMedium,
        t.checkboxBorderWidth,
        t.checkboxBoxOffsetY,
      )};
    `;
  },

  boxWrapperLarge(t: Theme) {
    return css`
      ${boxWrapperMixin(
        t.labGrotesqueBaselineCompensation,
        t.checkboxFontSizeLarge,
        t.checkboxBoxSizeLarge,
        t.checkboxBorderWidth,
        t.checkboxBoxOffsetY,
      )};
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

  icon() {
    return css`
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
  },

  iconFixPosition() {
    return css`
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
