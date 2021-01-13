import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';

import { buttonUseMixin, buttonHoverMixin, buttonActiveMixin, buttonSizeMixin, arrowFocusMixin } from './Button.mixins';

const styles = {
  root(t: Theme) {
    return css`
      ${resetButton()};
      ${resetText()};

      background-clip: border-box;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      cursor: pointer;
      display: inline-block;
      position: relative;
      text-align: center;
      width: 100%;

      &::-moz-focus-inner {
        border: 0;
        padding: 0;
      }
      &::after {
        content: '';
        display: inline-block;
        vertical-align: baseline;
        width: 0;
      }

      &:active {
        ${cssName(styles.caption())} {
          transform: translateY(1px);
        }
      }
    `;
  },

  warning(t: Theme) {
    return css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning};
    `;
  },

  error(t: Theme) {
    return css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError};
    `;
  },

  sizeSmall(t: Theme) {
    return css`
      border-radius: ${t.btnBorderRadiusSmall};

      ${buttonSizeMixin(
        t.btnFontSizeSmall,
        t.btnHeightSmall,
        t.btnHeightShift,
        t.btnLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        cssName(styles.link(t)),
        cssName(styles.fallback(t)),
      )};
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      border-radius: ${t.btnBorderRadiusMedium};

      ${buttonSizeMixin(
        t.btnFontSizeMedium,
        t.btnHeightMedium,
        t.btnHeightShift,
        t.btnLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        cssName(styles.link(t)),
        cssName(styles.fallback(t)),
      )};
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      border-radius: ${t.btnBorderRadiusLarge};

      ${buttonSizeMixin(
        t.btnFontSizeLarge,
        t.btnHeightLarge,
        t.btnHeightShift,
        t.btnLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        cssName(styles.link(t)),
        cssName(styles.fallback(t)),
      )};
    `;
  },

  link(t: Theme) {
    return css`
      background: none;
      border-radius: ${t.btnLinkBorderRadius} !important;
      border: none;
      box-shadow: none;
      color: ${t.btnLinkColor} !important;
      display: inline;
      line-height: inherit !important;
      margin: 0;
      padding: 0 !important;

      &:hover {
        color: ${t.btnLinkHoverColor} !important;
        text-decoration: ${t.btnLinkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkActiveColor} !important;
      }
      ${cssName(styles.caption())} {
        display: inline;
        transform: none !important;
      }
      ${cssName(styles.warning(t))} ,
      ${cssName(styles.error(t))}  {
        box-shadow: none;
        left: -2px !important;
        right: -2px !important;
        bottom: -2px !important;
      }
      ${cssName(styles.error(t))}  {
        background: ${t.btnErrorSecondary} !important;
      }
    `;
  },

  focus(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        position: relative;
        z-index: 2;

        &${cssName(styles.link(t))} {
          color: ${t.btnLinkColor};
          text-decoration: ${t.btnLinkHoverTextDecoration};
        }

        &:not(${cssName(styles.disabled(t))}):not(${cssName(styles.link(t))}) {
          border: ${t.btnFocusBorder};

          &,
          &:hover,
          &:active,
          ${cssName(styles.active(t))} {
            box-shadow: inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus},
              0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus};

            &${cssName(styles.warning(t))}, &${cssName(styles.error(t))} {
              box-shadow: inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus};
              border-color: transparent;
            }
        }
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        cursor: default;
        pointer-events: none;
        border-color: ${t.btnDisabledBorderColor} !important;

        &:not(${cssName(styles.link(t))}) {
          background: ${t.btnDisabledBg} !important;
          color: ${t.btnDisabledTextColor} !important;
          box-shadow: ${t.btnDisabledShadow} !important;

          ${cssName(styles.arrow())} {
            &:before,
            &:after {
              box-shadow: ${t.btnDisabledShadowArrow} !important;
            }
          }
        }

        &${cssName(styles.link(t))} {
          color: ${t.btnLinkDisabledColor} !important;
        }

        ${cssName(styles.caption())} {
          transform: none !important;
        }
      }
    `;
  },

  fallback(t: Theme) {
    return css`
      &${cssName(styles.disabled(t))} {
        outline-color: transparent;
      }
      &:not(${cssName(styles.link(t))}) {
        line-height: normal !important;
      }
    `;
  },

  validationRoot(t: Theme) {
    return css`
      ${cssName(styles.focus(t))}& {
        box-shadow: inset 0 0 0 1px ${t.btnOutlineColorFocus} !important;
        border-color: transparent !important;
      }
    `;
  },

  arrowWarning(t: Theme) {
    return css`
      &:before,
      &:after {
        box-shadow: ${t.btnOutlineWidth} 0 0 0 ${t.btnBorderColorWarning} !important;
      }
    `;
  },

  arrowWarningLeft() {
    return css`
      &:before {
        transform: skewX(-30deg) scaleX(-1) !important;
      }

      &:after {
        transform: skewX(30deg) scaleX(-1) !important;
      }
    `;
  },

  arrowError(t: Theme) {
    return css`
      &:before,
      &:after {
        box-shadow: ${t.btnOutlineWidth} 0 0 0 ${t.btnBorderColorError} !important;
      }
    `;
  },

  arrowFocus(t: Theme) {
    return css`
      ${arrowFocusMixin(t, t.btnBorderColorFocus)}

      &${cssName(styles.arrowWarning(t))} { ${arrowFocusMixin(t, t.btnBorderColorWarning)} }

      &${cssName(styles.arrowError(t))} { ${arrowFocusMixin(t, t.btnBorderColorError)} }
    `;
  },

  arrowErrorLeft(t: Theme) {
    return css`
      &:before,
      &:after {
        box-shadow: -${t.btnOutlineWidth} 0 0 0 ${t.btnBorderColorError} !important;
      }
    `;
  },

  arrow() {
    return css`
      background: inherit;
      border-radius: inherit;

      &:before,
      &:after {
        content: '';
        display: block;
        width: 100%;
        height: calc(50% + 0.25px);
        position: absolute;
        left: 0;
        background: inherit;
        background-size: 200% 200%;
        border-radius: inherit;
        z-index: 0;
      }

      &:before {
        top: 0px;
        transform: skewX(30deg);
        transform-origin: top;
        background-position-y: top;
        border-bottom-right-radius: 1px;
      }

      &:after {
        bottom: 0px;
        transform: skewX(-30deg);
        transform-origin: bottom;
        background-position-y: bottom;
        border-top-right-radius: 1px;
      }
    `;
  },

  arrowLeft() {
    return css`
      &:before {
        transform: skewX(-30deg) scaleX(-1) !important;
      }

      &:after {
        transform: skewX(30deg) scaleX(-1) !important;
      }
    `;
  },

  default(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        ${buttonUseMixin(
          t.btnDefaultBg,
          t.btnDefaultBgStart,
          t.btnDefaultBgEnd,
          t.btnDefaultShadow,
          t.btnDefaultShadowArrow,
          t.btnDefaultTextColor,
          t.btnDefaultBorder,
          cssName(styles.checked(t)),
          cssName(styles.arrow()),
        )};

        ${buttonHoverMixin(
          t.btnDefaultHoverBg,
          t.btnDefaultHoverBgStart,
          t.btnDefaultHoverBgEnd,
          t.btnDefaultHoverShadow,
          t.btnDefaultHoverShadowArrow,
          t.btnDefaultHoverBorderColor,
          cssName(styles.arrow()),
        )};

        ${buttonActiveMixin(
          t.btnDefaultActiveBg,
          t.btnDefaultActiveShadow,
          t.btnDefaultActiveShadowArrow,
          cssName(styles.active(t)),
          cssName(styles.arrow()),
        )};
      }
    `;
  },

  primary(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        ${buttonUseMixin(
          t.btnPrimaryBg,
          t.btnPrimaryBgStart,
          t.btnPrimaryBgEnd,
          t.btnPrimaryShadow,
          t.btnPrimaryShadowArrow,
          t.btnPrimaryTextColor,
          t.btnPrimaryBorder,
          cssName(styles.checked(t)),
          cssName(styles.arrow()),
        )};

        ${buttonHoverMixin(
          t.btnPrimaryHoverBg,
          t.btnPrimaryHoverBgStart,
          t.btnPrimaryHoverBgEnd,
          t.btnPrimaryHoverShadow,
          t.btnPrimaryHoverShadowArrow,
          t.btnPrimaryHoverBorderColor,
          cssName(styles.arrow()),
        )};

        ${buttonActiveMixin(
          t.btnPrimaryActiveBg,
          t.btnPrimaryActiveShadow,
          t.btnPrimaryActiveShadowArrow,
          cssName(styles.active(t)),
          cssName(styles.arrow()),
        )};
      }
    `;
  },

  success(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        ${buttonUseMixin(
          t.btnSuccessBg,
          t.btnSuccessBgStart,
          t.btnSuccessBgEnd,
          t.btnSuccessShadow,
          t.btnSuccessShadowArrow,
          t.btnSuccessTextColor,
          t.btnSuccessBorder,
          cssName(styles.checked(t)),
          cssName(styles.arrow()),
        )};

        ${buttonHoverMixin(
          t.btnSuccessHoverBg,
          t.btnSuccessHoverBgStart,
          t.btnSuccessHoverBgEnd,
          t.btnSuccessHoverShadow,
          t.btnSuccessHoverShadowArrow,
          t.btnSuccessHoverBorderColor,
          cssName(styles.arrow()),
        )};

        ${buttonActiveMixin(
          t.btnSuccessActiveBg,
          t.btnSuccessActiveShadow,
          t.btnSuccessActiveShadowArrow,
          cssName(styles.active(t)),
          cssName(styles.arrow()),
        )};
      }
    `;
  },

  danger(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        ${buttonUseMixin(
          t.btnDangerBg,
          t.btnDangerBgStart,
          t.btnDangerBgEnd,
          t.btnDangerShadow,
          t.btnDangerShadowArrow,
          t.btnDangerTextColor,
          t.btnDangerBorder,
          cssName(styles.checked(t)),
          cssName(styles.arrow()),
        )};

        ${buttonHoverMixin(
          t.btnDangerHoverBg,
          t.btnDangerHoverBgStart,
          t.btnDangerHoverBgEnd,
          t.btnDangerHoverShadow,
          t.btnDangerHoverShadowArrow,
          t.btnDangerHoverBorderColor,
          cssName(styles.arrow()),
        )};

        ${buttonActiveMixin(
          t.btnDangerActiveBg,
          t.btnDangerActiveShadow,
          t.btnDangerActiveShadowArrow,
          cssName(styles.active(t)),
          cssName(styles.arrow()),
        )};
      }
    `;
  },

  pay(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        ${buttonUseMixin(
          t.btnPayBg,
          t.btnPayBgStart,
          t.btnPayBgEnd,
          t.btnPayShadow,
          t.btnPayShadowArrow,
          t.btnPayTextColor,
          t.btnPayBorder,
          cssName(styles.checked(t)),
          cssName(styles.arrow()),
        )};

        ${buttonHoverMixin(
          t.btnPayHoverBg,
          t.btnPayHoverBgStart,
          t.btnPayHoverBgEnd,
          t.btnPayHoverShadow,
          t.btnPayHoverShadowArrow,
          t.btnPayHoverBorderColor,
          cssName(styles.arrow()),
        )};

        ${buttonActiveMixin(
          t.btnPayActiveBg,
          t.btnPayActiveShadow,
          t.btnPayActiveShadowArrow,
          cssName(styles.active(t)),
          cssName(styles.arrow()),
        )};
      }
    `;
  },

  checked(t: Theme) {
    return css`
      box-shadow: ${t.btnCheckedShadow} !important;
      background: ${t.btnCheckedBg} !important;
      color: ${t.btnCheckedTextColor} !important;

      &:not(${cssName(styles.link(t))}) {
        ${cssName(styles.caption())} {
          transform: translateY(1px) !important;
        }
      }

      &:not(${cssName(styles.link(t))})${cssName(styles.disabled(t))} {
        box-shadow: ${t.btnCheckedDisabledShadow} !important;
        background: ${t.btnCheckedDisabledBg} !important;
        color: ${t.btnCheckedDisabledColor} !important;
        border-color: ${t.btnCheckedDisabledBorderColor} !important;

        ${cssName(styles.arrow())} {
          &:before,
          &:after {
            background: ${t.btnCheckedDisabledBg} !important;
            box-shadow: ${t.btnCheckedDisabledShadowArrow} !important;
          }
        }
      }

      &,
      &:not(${cssName(styles.focus(t))}) {
        ${cssName(styles.arrow())} {
          &:before,
          &:after {
            background: ${t.btnCheckedBg} !important;
            box-shadow: ${t.btnCheckedShadowArrow} !important;
          }
        }
      }
    `;
  },

  active(t: Theme) {
    return css`
      &:not(${cssName(styles.link(t))}):not(${cssName(styles.disabled(t))}) {
        ${cssName(styles.caption())} {
          transform: translateY(1px) !important;
        }
      }
    `;
  },

  caption() {
    return css`
      position: relative;
      white-space: nowrap;
      display: inline-block;
      width: 100%;
      vertical-align: top;
    `;
  },

  wrap(t: Theme) {
    return css`
      padding: ${t.btnWrapPadding};
      box-sizing: border-box;
      display: inline-block;
    `;
  },

  narrow() {
    return css`
      padding-left: 5px !important;
      padding-right: 5px !important;
    `;
  },

  noPadding() {
    return css`
      padding-left: 0 !important;
      padding-right: 0 !important;
    `;
  },

  noRightPadding() {
    return css`
      padding-right: 0 !important;
    `;
  },

  iconNoRightPadding() {
    return css`
      padding-right: 0 !important;
    `;
  },

  iconLink(t: Theme) {
    return css`
      padding-right: ${t.btnLinkIconMarginRight} !important;
    `;
  },

  wrapLink(t: Theme) {
    return css`
      ${styles.wrap(t)};

      padding: 0;
    `;
  },

  wrapArrow() {
    return css`
      margin-right: 10px;
    `;
  },

  wrapArrowLeft() {
    return css`
      margin-right: 0;
      margin-left: 10px;
    `;
  },

  icon() {
    return css`
      display: inline-block;
    `;
  },
  iconSmall(t: Theme) {
    return css`
      width: ${t.btnIconSizeSmall};
      padding-right: ${t.btnIconGapSmall};
    `;
  },
  iconMedium(t: Theme) {
    return css`
      width: ${t.btnIconSizeMedium};
      padding-right: ${t.btnIconGapMedium};
    `;
  },
  iconLarge(t: Theme) {
    return css`
      width: ${t.btnIconSizeLarge};
      padding-right: ${t.btnIconGapLarge};
    `;
  },

  borderless(t: Theme) {
    const focus = cssName(styles.focus(t));
    const disabled = cssName(styles.disabled(t));
    const checked = cssName(styles.checked(t));
    const active = cssName(styles.active(t));

    return css`
      &:not(${focus}):not(${disabled}):not(${active}):not(${checked}) {
        &,
        &:hover,
        &:active {
          box-shadow: none !important;
        }
      }
    `;
  },

  loading() {
    return css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    `;
  },

  visibilityHidden() {
    return css`
      visibility: hidden;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
