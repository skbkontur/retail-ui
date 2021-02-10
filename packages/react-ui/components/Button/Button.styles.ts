import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';

import { buttonUseMixin, buttonHoverMixin, buttonActiveMixin, buttonSizeMixin, arrowFocusMixin } from './Button.mixins';

const styles = {
  root(t: Theme) {
    return css`
      ${resetButton()};
      ${resetText()};

      background-clip: padding-box !important;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      cursor: pointer;
      display: inline-block;
      position: relative;
      text-align: center;
      width: 100%;
      border: ${t.btnBorderWidth} solid transparent;

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

          &,
          &:hover,
          &:active,
          ${cssName(styles.active(t))} {
            box-shadow: inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${
      t.btnBorderColorFocus
    };
            border-color: ${t.btnBorderColorFocus};

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

          ${cssName(styles.arrow(t))} {
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

  arrow(t: Theme) {
    return css`
      background: inherit;
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

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
        top: -${t.btnBorderWidth};
        transform: skewX(30deg);
        transform-origin: top;
        background-position-y: top;
        border-bottom-right-radius: 1px;
        border-top: ${t.btnBorderWidth} solid transparent;
      }

      &:after {
        bottom: -${t.btnBorderWidth};
        transform: skewX(-30deg);
        transform-origin: bottom;
        background-position-y: bottom;
        border-top-right-radius: 1px;
        border-bottom: ${t.btnBorderWidth} solid transparent;
      }
    `;
  },

  arrowLeft() {
    return css`
      transform: scaleX(-1);
    `;
  },

  default(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        ${buttonUseMixin(
          t.btnDefaultBg,
          t.btnDefaultBgStart,
          t.btnDefaultBgEnd,
          t.btnDefaultShadowArrow,
          t.btnDefaultTextColor,
          t.btnDefaultBorderColor,
          cssName(styles.checked(t)),
          cssName(styles.arrow(t)),
        )};

        ${buttonHoverMixin(
          t.btnDefaultHoverBg,
          t.btnDefaultHoverBgStart,
          t.btnDefaultHoverBgEnd,
          t.btnDefaultHoverShadowArrow,
          t.btnDefaultHoverBorderColor,
          cssName(styles.arrow(t)),
        )};

        ${buttonActiveMixin(
          t.btnDefaultActiveBg,
          t.btnDefaultActiveShadow,
          t.btnDefaultActiveShadowArrow,
          t.btnDefaultActiveBorderColor,
          cssName(styles.active(t)),
          cssName(styles.arrow(t)),
          t.btnArrowBgImageActive,
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
          t.btnPrimaryShadowArrow,
          t.btnPrimaryTextColor,
          t.btnPrimaryBorderColor,
          cssName(styles.checked(t)),
          cssName(styles.arrow(t)),
        )};

        ${buttonHoverMixin(
          t.btnPrimaryHoverBg,
          t.btnPrimaryHoverBgStart,
          t.btnPrimaryHoverBgEnd,
          t.btnPrimaryHoverShadowArrow,
          t.btnPrimaryHoverBorderColor,
          cssName(styles.arrow(t)),
        )};

        ${buttonActiveMixin(
          t.btnPrimaryActiveBg,
          t.btnPrimaryActiveShadow,
          t.btnPrimaryActiveShadowArrow,
          t.btnPrimaryActiveBorderColor,
          cssName(styles.active(t)),
          cssName(styles.arrow(t)),
          t.btnArrowBgImageActive,
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
          t.btnSuccessShadowArrow,
          t.btnSuccessTextColor,
          t.btnSuccessBorderColor,
          cssName(styles.checked(t)),
          cssName(styles.arrow(t)),
        )};

        ${buttonHoverMixin(
          t.btnSuccessHoverBg,
          t.btnSuccessHoverBgStart,
          t.btnSuccessHoverBgEnd,
          t.btnSuccessHoverShadowArrow,
          t.btnSuccessHoverBorderColor,
          cssName(styles.arrow(t)),
        )};

        ${buttonActiveMixin(
          t.btnSuccessActiveBg,
          t.btnSuccessActiveShadow,
          t.btnSuccessActiveShadowArrow,
          t.btnSuccessActiveBorderColor,
          cssName(styles.active(t)),
          cssName(styles.arrow(t)),
          t.btnArrowBgImageActive,
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
          t.btnDangerShadowArrow,
          t.btnDangerTextColor,
          t.btnDangerBorderColor,
          cssName(styles.checked(t)),
          cssName(styles.arrow(t)),
        )};

        ${buttonHoverMixin(
          t.btnDangerHoverBg,
          t.btnDangerHoverBgStart,
          t.btnDangerHoverBgEnd,
          t.btnDangerHoverShadowArrow,
          t.btnDangerHoverBorderColor,
          cssName(styles.arrow(t)),
        )};

        ${buttonActiveMixin(
          t.btnDangerActiveBg,
          t.btnDangerActiveShadow,
          t.btnDangerActiveShadowArrow,
          t.btnDangerActiveBorderColor,
          cssName(styles.active(t)),
          cssName(styles.arrow(t)),
          t.btnArrowBgImageActive,
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
          t.btnPayShadowArrow,
          t.btnPayTextColor,
          t.btnPayBorderColor,
          cssName(styles.checked(t)),
          cssName(styles.arrow(t)),
        )};

        ${buttonHoverMixin(
          t.btnPayHoverBg,
          t.btnPayHoverBgStart,
          t.btnPayHoverBgEnd,
          t.btnPayHoverShadowArrow,
          t.btnPayHoverBorderColor,
          cssName(styles.arrow(t)),
        )};

        ${buttonActiveMixin(
          t.btnPayActiveBg,
          t.btnPayActiveShadow,
          t.btnPayActiveShadowArrow,
          t.btnPayActiveBorderColor,
          cssName(styles.active(t)),
          cssName(styles.arrow(t)),
          t.btnArrowBgImageActive,
        )};
      }
    `;
  },

  checked(t: Theme) {
    return css`
      box-shadow: ${t.btnCheckedShadow} !important;
      background: ${t.btnCheckedBg} !important;
      color: ${t.btnCheckedTextColor} !important;
      border-color: ${t.btnDefaultCheckedBorderColor} !important;

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

        ${cssName(styles.arrow(t))} {
          &:before,
          &:after {
            background: ${t.btnCheckedDisabledBg} !important;
            box-shadow: ${t.btnCheckedDisabledShadowArrow} !important;
          }
        }
      }

      &,
      &:not(${cssName(styles.focus(t))}) {
        ${cssName(styles.arrow(t))} {
          &:before,
          &:after {
            background: ${t.btnCheckedBg} !important;
            box-shadow: ${t.btnCheckedShadowArrow} !important;
          }

          &:before {
            background-image: ${t.btnArrowBgImageChecked} !important;
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
          border-color: transparent;
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
