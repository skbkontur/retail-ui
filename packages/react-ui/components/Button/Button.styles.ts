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
      white-space: nowrap;
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
          box-shadow: none;

          ${cssName(styles.arrowHelper())} {
            box-shadow: ${t.btnBorderWidth} 0 0 0 ${t.btnDisabledBorderColor} !important;
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
      ${cssName(styles.arrowHelper())} {
        box-shadow: ${t.btnOutlineWidth} 0 0 0 ${t.btnBorderColorWarning} !important;
      }
    `;
  },

  arrowError(t: Theme) {
    return css`
      ${cssName(styles.arrowHelper())} {
        box-shadow: ${t.btnOutlineWidth} 0 0 0 ${t.btnBorderColorError} !important;
      }
    `;
  },

  arrowFocus(t: Theme) {
    return css`
      ${cssName(styles.root(t))}:not(${cssName(styles.checked(t))}) & {
        box-shadow: inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus};

        ${arrowFocusMixin(
          t.btnBorderWidth,
          t.btnBorderColorFocus,
          t.btnOutlineWidth,
          t.btnOutlineColorFocus,
          cssName(styles.arrowHelper()),
          cssName(styles.arrowHelperTop()),
          cssName(styles.arrowHelperBottom()),
        )}

        &${cssName(styles.arrowWarning(t))} {
          ${arrowFocusMixin(
            t.btnBorderWidth,
            t.btnBorderColorWarning,
            t.btnOutlineWidth,
            t.btnOutlineColorFocus,
            cssName(styles.arrowHelper()),
            cssName(styles.arrowHelperTop()),
            cssName(styles.arrowHelperBottom()),
          )} }

        &${cssName(styles.arrowError(t))} {
          ${arrowFocusMixin(
            t.btnBorderWidth,
            t.btnBorderColorError,
            t.btnOutlineWidth,
            t.btnOutlineColorFocus,
            cssName(styles.arrowHelper()),
            cssName(styles.arrowHelperTop()),
            cssName(styles.arrowHelperBottom()),
          )} }
      }
    `;
  },

  arrow() {
    return css`
      background: inherit;
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `;
  },

  arrowLeft() {
    return css`
      transform: scaleX(-1);
    `;
  },

  arrowHelper() {
    return css`
      width: 100%;
      height: 50%;
      position: absolute;
      left: 0;
      background: inherit;
      background-size: 200% 200%;
      border-radius: inherit;
      background-clip: padding-box;

      // fix ugly arrow edge
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: inherit;
        border-radius: inherit;
        transform: translateX(0.4px);
      }
    `;
  },

  arrowHelperTop() {
    return css`
      top: 0;
      transform: skewX(30deg);
      transform-origin: top;
      background-position-y: top;
      border-bottom-right-radius: 1px;

      // fix ugly line in the
      // middle of the button
      &:before {
        bottom: -1px;
      }
    `;
  },

  arrowHelperBottom() {
    return css`
      bottom: 0;
      transform: skewX(-30deg);
      transform-origin: bottom;
      background-position-y: bottom;
      border-top-right-radius: 1px;
    `;
  },

  default(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        ${buttonUseMixin(
          t.btnDefaultBg,
          t.btnDefaultBgStart,
          t.btnDefaultBgEnd,
          t.btnDefaultTextColor,
          t.btnDefaultBorderColor,
          t.btnDefaultBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.checked(t)),
          cssName(styles.arrowHelper()),
        )};

        ${buttonHoverMixin(
          t.btnDefaultHoverBg,
          t.btnDefaultHoverBgStart,
          t.btnDefaultHoverBgEnd,
          t.btnDefaultHoverBorderColor,
          t.btnDefaultHoverBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.arrowHelper()),
        )};

        ${buttonActiveMixin(
          t.btnDefaultActiveBg,
          t.btnDefaultActiveShadow,
          t.btnDefaultActiveBorderColor,
          t.btnDefaultActiveBorderTopColor,
          t.btnBorderWidth,
          cssName(styles.active(t)),
          cssName(styles.arrowHelper()),
          cssName(styles.arrowHelperTop()),
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
          t.btnPrimaryTextColor,
          t.btnPrimaryBorderColor,
          t.btnPrimaryBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.checked(t)),
          cssName(styles.arrowHelper()),
        )};

        ${buttonHoverMixin(
          t.btnPrimaryHoverBg,
          t.btnPrimaryHoverBgStart,
          t.btnPrimaryHoverBgEnd,
          t.btnPrimaryHoverBorderColor,
          t.btnPrimaryHoverBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.arrowHelper()),
        )};

        ${buttonActiveMixin(
          t.btnPrimaryActiveBg,
          t.btnPrimaryActiveShadow,
          t.btnPrimaryActiveBorderColor,
          t.btnPrimaryActiveBorderTopColor,
          t.btnBorderWidth,
          cssName(styles.active(t)),
          cssName(styles.arrowHelper()),
          cssName(styles.arrowHelperTop()),
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
          t.btnSuccessTextColor,
          t.btnSuccessBorderColor,
          t.btnSuccessBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.checked(t)),
          cssName(styles.arrowHelper()),
        )};

        ${buttonHoverMixin(
          t.btnSuccessHoverBg,
          t.btnSuccessHoverBgStart,
          t.btnSuccessHoverBgEnd,
          t.btnSuccessHoverBorderColor,
          t.btnSuccessHoverBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.arrowHelper()),
        )};

        ${buttonActiveMixin(
          t.btnSuccessActiveBg,
          t.btnSuccessActiveShadow,
          t.btnSuccessActiveBorderColor,
          t.btnSuccessActiveBorderTopColor,
          t.btnBorderWidth,
          cssName(styles.active(t)),
          cssName(styles.arrowHelper()),
          cssName(styles.arrowHelperTop()),
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
          t.btnDangerTextColor,
          t.btnDangerBorderColor,
          t.btnDangerBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.checked(t)),
          cssName(styles.arrowHelper()),
        )};

        ${buttonHoverMixin(
          t.btnDangerHoverBg,
          t.btnDangerHoverBgStart,
          t.btnDangerHoverBgEnd,
          t.btnDangerHoverBorderColor,
          t.btnDangerHoverBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.arrowHelper()),
        )};

        ${buttonActiveMixin(
          t.btnDangerActiveBg,
          t.btnDangerActiveShadow,
          t.btnDangerActiveBorderColor,
          t.btnDangerActiveBorderTopColor,
          t.btnBorderWidth,
          cssName(styles.active(t)),
          cssName(styles.arrowHelper()),
          cssName(styles.arrowHelperTop()),
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
          t.btnPayTextColor,
          t.btnPayBorderColor,
          t.btnPayBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.checked(t)),
          cssName(styles.arrowHelper()),
        )};

        ${buttonHoverMixin(
          t.btnPayHoverBg,
          t.btnPayHoverBgStart,
          t.btnPayHoverBgEnd,
          t.btnPayHoverBorderColor,
          t.btnPayHoverBorderBottomColor,
          t.btnBorderWidth,
          cssName(styles.arrowHelper()),
        )};

        ${buttonActiveMixin(
          t.btnPayActiveBg,
          t.btnPayActiveShadow,
          t.btnPayActiveBorderColor,
          t.btnPayActiveBorderTopColor,
          t.btnBorderWidth,
          cssName(styles.active(t)),
          cssName(styles.arrowHelper()),
          cssName(styles.arrowHelperTop()),
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

        ${cssName(styles.arrowHelper())} {
          box-shadow: ${t.btnBorderWidth} 0 0 ${t.btnCheckedDisabledBorderColor} !important;

          &${cssName(styles.arrowHelperTop())} {
            background-image: none !important;
          }
        }
      }

      &,
      &:not(${cssName(styles.focus(t))}) {
        ${cssName(styles.arrowHelper())} {
          box-shadow: ${t.btnBorderWidth} 0 0 ${t.btnDefaultCheckedBorderColor} !important;

          &${cssName(styles.arrowHelperTop())} {
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
