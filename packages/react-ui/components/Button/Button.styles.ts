import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';
import { isFirefox } from '../../lib/client';

import {
  buttonUseMixin,
  buttonHoverMixin,
  buttonActiveMixin,
  buttonSizeMixin,
  arrowOutlineMixin,
  buttonSizeMixinIE11,
} from './Button.mixins';
import { hover, active, focus } from '../../lib/theming/ManualAction';

export const globalClasses = prefix('button')({
  arrowHelper: 'arrow-helper',
  arrowHelperTop: 'arrow-helper-top',
  arrowHelperBottom: 'arrow-helper-bottom',
  caption: 'caption',
  text: 'text',
  innerShadow: 'inner-shadow',
});

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      ${resetButton()};
      ${resetText()};

      background-clip: ${t.btnBackgroundClip};
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      cursor: pointer;
      display: inline-block;
      position: relative;
      text-align: center;
      width: 100%;
      height: 100%; // fix height in ie11

      .${globalClasses.innerShadow} {
        content: '';
        border-radius: inherit;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

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

      ${active` .${globalClasses.caption}`} {
        transform: translateY(1px);
      }
    `;
  },

  outline() {
    return css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `;
  },

  outlineWarning(t: Theme) {
    return css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning},
        inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },

  outlineError(t: Theme) {
    return css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError}, inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },

  outlineLink() {
    return css`
      box-shadow: none;
      left: -2px;
      right: -2px;
      bottom: -2px;
    `;
  },

  outlineLinkWarning(t: Theme) {
    return css`
      background-color: ${t.btnWarningSecondary};
    `;
  },

  outlineLinkError(t: Theme) {
    return css`
      background-color: ${t.btnErrorSecondary};
    `;
  },

  sizeSmall(t: Theme) {
    return css`
      border-radius: ${t.btnBorderRadiusSmall};

      ${buttonSizeMixin(
        t.btnFontSizeSmall,
        t.btnLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        t.fontFamilyCompensationBaseline,
      )};
    `;
  },

  sizeSmallIE11(t: Theme) {
    return css`
      ${buttonSizeMixinIE11(
        t.btnFontSizeSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        t.fontFamilyCompensationBaseline,
      )};
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      border-radius: ${t.btnBorderRadiusMedium};

      ${buttonSizeMixin(
        t.btnFontSizeMedium,
        t.btnLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        t.fontFamilyCompensationBaseline,
      )};
    `;
  },

  sizeMediumIE11(t: Theme) {
    return css`
      ${buttonSizeMixinIE11(
        t.btnFontSizeMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        t.fontFamilyCompensationBaseline,
      )};
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      border-radius: ${t.btnBorderRadiusLarge};

      ${buttonSizeMixin(
        t.btnFontSizeLarge,
        t.btnLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        t.fontFamilyCompensationBaseline,
      )};
    `;
  },

  sizeLargeIE11(t: Theme) {
    return css`
      ${buttonSizeMixinIE11(
        t.btnFontSizeLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        t.fontFamilyCompensationBaseline,
      )};
    `;
  },

  sizeSmallWithIcon(t: Theme) {
    return css`
      padding-left: ${t.btnSmallWithIconPaddingLeft};
    `;
  },

  sizeMediumWithIcon(t: Theme) {
    return css`
      padding-left: ${t.btnMediumWithIconPaddingLeft};
    `;
  },

  sizeLargeWithIcon(t: Theme) {
    return css`
      padding-left: ${t.btnLargeWithIconPaddingLeft};
    `;
  },

  link(t: Theme) {
    return css`
      background: none;
      border-radius: ${t.btnLinkBorderRadius};
      border: none;
      box-shadow: none;
      white-space: nowrap;
      color: ${t.btnLinkColor};
      display: inline;
      line-height: inherit !important; // override size mixin
      margin: 0;
      padding: 0 !important; // override size mixin
      height: auto !important; // override size mixin

      ${hover``},
      ${active``} {
        color: ${t.btnLinkHoverColor};
        text-decoration: ${t.btnLinkHoverTextDecoration};
      }
      ${active``} {
        ${activeStyles.link(t)}
      }
    `;
  },

  linkFocus(t: Theme) {
    return css`
      color: ${t.btnLinkColor};
      text-decoration: ${t.btnLinkHoverTextDecoration};
    `;
  },

  linkDisabled(t: Theme) {
    return css`
      cursor: default;
      pointer-events: none;

      &,
      &:hover,
      &:active {
        color: ${t.btnLinkDisabledColor};
      }
    `;
  },

  linkLine(t: Theme) {
    return css`
      & .${globalClasses.text} {
        position: relative;
      }

      & .${globalClasses.text}:before {
        content: '';
        position: absolute;
        height: 0;
        width: 100%;
        bottom: ${t.btnLinkLineBottom};
        border-bottom-color: ${t.btnLinkLineBorderBottomColor};
        border-bottom-style: ${t.btnLinkLineBorderBottomStyle};
        border-bottom-width: ${t.btnLinkLineBorderBottomWidth};
      }

      ${hover` .${globalClasses.text}:before`},
      ${focus` .${globalClasses.text}:before`} {
        border-bottom-color: ${t.btnLinkHoverLineBorderBottomColor};
      }

      ${active` .${globalClasses.text}:before`} {
        border-bottom-color: ${t.btnLinkActiveLineBorderBottomColor};
      }
    `;
  },

  linkLineFocus(t: Theme) {
    return css`
      & .${globalClasses.text}:before {
        border-bottom-color: ${t.btnLinkHoverLineBorderBottomColor};
      }
    `;
  },

  linkLineDisabled(t: Theme) {
    return css`
      cursor: default;
      pointer-events: none;
      color: ${t.btnLinkDisabledColor};

      & .${globalClasses.text}:before {
        border-bottom-color: ${t.btnLinkDisabledColor};
      }
    `;
  },

  focus(t: Theme) {
    return css`
      position: relative;
      z-index: 2;

      &:not(:disabled),
      &:hover:not(:disabled),
      &:active:not(:disabled),
      &:active:hover:not(:disabled),
      ${focus``} {
        box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
          0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus} !important;
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      cursor: default;
      pointer-events: none;
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDisabledBorderColor};

      background-image: none;
      background-color: ${t.btnDisabledBg};
      color: ${t.btnDisabledTextColor};

      .${globalClasses.arrowHelper} {
        box-shadow: ${t.btnBorderWidth} 0 0 0 ${t.btnDisabledBorderColor};
      }
    `;
  },

  arrowWarning(t: Theme) {
    return css`
      box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};

      ${arrowOutlineMixin(t.btnInsetWidth, t.btnBorderColorWarning, t.btnOutlineWidth, t.btnInsetColor)}
    `;
  },

  arrowError(t: Theme) {
    return css`
      box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};

      ${arrowOutlineMixin(t.btnInsetWidth, t.btnBorderColorError, t.btnOutlineWidth, t.btnInsetColor)}
    `;
  },

  arrowFocus(t: Theme) {
    return css`
      box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus};

      ${arrowOutlineMixin(t.btnInsetWidth, t.btnBorderColorFocus, t.btnOutlineWidth, t.btnOutlineColorFocus)}
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

      .${globalClasses.arrowHelper} {
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
          transform: translateX(${isFirefox ? `0.2px` : `0.3px`});
        }
      }

      .${globalClasses.arrowHelperTop} {
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
      }

      .${globalClasses.arrowHelperBottom} {
        bottom: 0;
        transform: skewX(-30deg);
        transform-origin: bottom;
        background-position-y: bottom;
        border-top-right-radius: 1px;

        // fix ugly line in the
        // middle of the button
        &:before {
          top: -1px;
        }
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
      ${buttonUseMixin(
        t.btnDefaultBg,
        t.btnDefaultBgStart,
        t.btnDefaultBgEnd,
        t.btnDefaultTextColor,
        t.btnDefaultBorderColor,
        t.btnDefaultBorderBottomColor,
        t.btnBorderWidth,
      )};

      ${hover``} {
        ${buttonHoverMixin(
          t.btnDefaultHoverBg,
          t.btnDefaultHoverBgStart,
          t.btnDefaultHoverBgEnd,
          t.btnDefaultHoverBorderColor,
          t.btnDefaultHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      ${active``} {
        ${activeStyles.default(t)};
      }
    `;
  },

  primary(t: Theme) {
    return css`
      ${buttonUseMixin(
        t.btnPrimaryBg,
        t.btnPrimaryBgStart,
        t.btnPrimaryBgEnd,
        t.btnPrimaryTextColor,
        t.btnPrimaryBorderColor,
        t.btnPrimaryBorderBottomColor,
        t.btnBorderWidth,
      )};

      ${hover``} {
        ${buttonHoverMixin(
          t.btnPrimaryHoverBg,
          t.btnPrimaryHoverBgStart,
          t.btnPrimaryHoverBgEnd,
          t.btnPrimaryHoverBorderColor,
          t.btnPrimaryHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      ${active``} {
        ${activeStyles.primary(t)}
      }
    `;
  },

  success(t: Theme) {
    return css`
      ${buttonUseMixin(
        t.btnSuccessBg,
        t.btnSuccessBgStart,
        t.btnSuccessBgEnd,
        t.btnSuccessTextColor,
        t.btnSuccessBorderColor,
        t.btnSuccessBorderBottomColor,
        t.btnBorderWidth,
      )};

      ${hover``} {
        ${buttonHoverMixin(
          t.btnSuccessHoverBg,
          t.btnSuccessHoverBgStart,
          t.btnSuccessHoverBgEnd,
          t.btnSuccessHoverBorderColor,
          t.btnSuccessHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      ${active``} {
        ${activeStyles.success(t)}
      }
    `;
  },

  danger(t: Theme) {
    return css`
      ${buttonUseMixin(
        t.btnDangerBg,
        t.btnDangerBgStart,
        t.btnDangerBgEnd,
        t.btnDangerTextColor,
        t.btnDangerBorderColor,
        t.btnDangerBorderBottomColor,
        t.btnBorderWidth,
      )};

      ${hover``} {
        ${buttonHoverMixin(
          t.btnDangerHoverBg,
          t.btnDangerHoverBgStart,
          t.btnDangerHoverBgEnd,
          t.btnDangerHoverBorderColor,
          t.btnDangerHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      ${active``} {
        ${activeStyles.danger(t)}
      }
    `;
  },

  pay(t: Theme) {
    return css`
      ${buttonUseMixin(
        t.btnPayBg,
        t.btnPayBgStart,
        t.btnPayBgEnd,
        t.btnPayTextColor,
        t.btnPayBorderColor,
        t.btnPayBorderBottomColor,
        t.btnBorderWidth,
      )};

      ${hover``} {
        ${buttonHoverMixin(
          t.btnPayHoverBg,
          t.btnPayHoverBgStart,
          t.btnPayHoverBgEnd,
          t.btnPayHoverBorderColor,
          t.btnPayHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      ${active``} {
        ${activeStyles.pay(t)}
      }
    `;
  },

  text(t: Theme) {
    return css`
      ${styles.borderless(t)}
      ${styles.backless(t)}
    `;
  },

  backless(t: Theme) {
    return css`
      ${styles.default(t)}

      color: ${t.btnDefaultTextColor};
      background: transparent;

      ${hover``} {
        background: ${t.btnBacklessHoverBg};
      }

      ${active``} {
        ${activeStyles.backless(t)}
      }
    `;
  },

  checked(t: Theme) {
    const checkedStyles = `
      background-image: none;
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDefaultCheckedBorderColor};
      background-color: ${t.btnCheckedBg};
      color: ${t.btnCheckedTextColor};

      .${globalClasses.innerShadow} {
        box-shadow: ${t.btnCheckedShadow};
      }

      .${globalClasses.arrowHelper} {
        box-shadow: ${t.btnBorderWidth} 0 0 ${t.btnDefaultCheckedBorderColor};

        &.${globalClasses.arrowHelperTop} {
          background-image: ${t.btnArrowBgImageChecked};
        }
      }
    `;

    return css`
      ${checkedStyles}

      &:hover:active,
      ${hover``},
      ${active``} {
        ${checkedStyles}
      }
    `;
  },

  checkedFocused(t: Theme) {
    return css`
      &:hover {
        box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
          0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus};
        border-color: ${t.btnBorderColorFocus};
      }
    `;
  },

  checkedDisabled(t: Theme) {
    return css`
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnCheckedDisabledBorderColor};
      background-color: ${t.btnCheckedDisabledBg};
      color: ${t.btnCheckedDisabledColor};

      .${globalClasses.innerShadow} {
        box-shadow: ${t.btnCheckedDisabledShadow};
      }

      .${globalClasses.arrowHelper} {
        box-shadow: ${t.btnBorderWidth} 0 0 ${t.btnCheckedDisabledBorderColor};

        &.${globalClasses.arrowHelperTop} {
          background-image: none;
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

  captionLink() {
    return css`
      display: inline;
      transform: none !important; // override root:active style
    `;
  },

  captionTranslated() {
    return css`
      transform: translateY(1px);
    `;
  },

  captionDisabled() {
    return css`
      transform: none !important; // override root:active style
    `;
  },

  wrap(t: Theme) {
    return css`
      box-sizing: border-box;
      display: inline-block;
      line-height: normal;
      padding: ${t.btnBorderWidth};
    `;
  },

  wrapSmall(t: Theme) {
    return css`
      height: ${t.btnHeightSmall};
    `;
  },

  wrapMedium(t: Theme) {
    return css`
      height: ${t.btnHeightMedium};
    `;
  },

  wrapLarge(t: Theme) {
    return css`
      height: ${t.btnHeightLarge};
    `;
  },

  narrow() {
    return css`
      padding-left: 5px;
      padding-right: 5px;
    `;
  },

  noPadding() {
    return css`
      padding-left: 0;
      padding-right: 0;
    `;
  },

  noRightPadding() {
    return css`
      padding-right: 0;
    `;
  },

  iconNoRightMargin() {
    return css`
      margin-right: 0;
    `;
  },

  iconLink(t: Theme) {
    return css`
      margin-right: ${t.btnLinkIconMarginRight};
    `;
  },

  wrapLink() {
    return css`
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
      margin-right: ${t.btnIconGapSmall};
    `;
  },
  iconMedium(t: Theme) {
    return css`
      width: ${t.btnIconSizeMedium};
      margin-right: ${t.btnIconGapMedium};
    `;
  },
  iconLarge(t: Theme) {
    return css`
      width: ${t.btnIconSizeLarge};
      margin-right: ${t.btnIconGapLarge};
    `;
  },

  borderless() {
    return css`
      &,
      &:hover,
      &:active {
        box-shadow: none !important;
        .${globalClasses.arrowHelperTop}, .${globalClasses.arrowHelperBottom} {
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
});

export const activeStyles = memoizeStyle({
  default(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin(
          t.btnDefaultActiveBg,
          t.btnDefaultActiveShadow,
          t.btnDefaultActiveBorderColor,
          t.btnDefaultActiveBorderTopColor,
          t.btnBorderWidth,
          t.btnArrowBgImageActive,
        )};
      }
    `;
  },

  primary(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin(
          t.btnPrimaryActiveBg,
          t.btnPrimaryActiveShadow,
          t.btnPrimaryActiveBorderColor,
          t.btnPrimaryActiveBorderTopColor,
          t.btnBorderWidth,
          t.btnArrowBgImageActive,
        )};
      }
    `;
  },

  success(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin(
          t.btnSuccessActiveBg,
          t.btnSuccessActiveShadow,
          t.btnSuccessActiveBorderColor,
          t.btnSuccessActiveBorderTopColor,
          t.btnBorderWidth,
          t.btnArrowBgImageActive,
        )};
      }
    `;
  },

  danger(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin(
          t.btnDangerActiveBg,
          t.btnDangerActiveShadow,
          t.btnDangerActiveBorderColor,
          t.btnDangerActiveBorderTopColor,
          t.btnBorderWidth,
          t.btnArrowBgImageActive,
        )};
      }
    `;
  },

  pay(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin(
          t.btnPayActiveBg,
          t.btnPayActiveShadow,
          t.btnPayActiveBorderColor,
          t.btnPayActiveBorderTopColor,
          t.btnBorderWidth,
          t.btnArrowBgImageActive,
        )};
      }
    `;
  },

  link(t: Theme) {
    return css`
      & {
        color: ${t.btnLinkActiveColor};
      }
    `;
  },

  text(t: Theme) {
    return css`
      & {
        color: red;
      }
    `;
  },

  backless(t: Theme) {
    return css`
      & {
        background: ${t.btnBacklessActiveBg};
      }
    `;
  },
});
