import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
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

export const globalClasses = prefix('button')({
  root: 'root',
  arrowHelper: 'arrow-helper',
  arrowHelperTop: 'arrow-helper-top',
  arrowHelperBottom: 'arrow-helper-bottom',
  arrow: 'arrow',
  caption: 'caption',
  text: 'text',
  innerShadow: 'inner-shadow',
  icon: 'icon',
});

export const styles = memoizeStyle({
  root(t: Theme) {
    // ! DONE
    return css`
      ${resetButton()};
      ${resetText()};

      transition: background-color ${t.transitionDuration} ${t.transitionTimingFunction}
        ${t.btnBorderColorTransition ? `, ${t.btnBorderColorTransition}` : ''};

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

      &:hover:enabled svg {
        color: ${t.btnIconHoverColor};
      }
      &:disabled svg {
        color: ${t.btnIconDisabledColor};
      }
      &:enabled svg {
        color: ${t.btnIconColor};
      }
    `;
  },

  withArrowIconRightSmall(t: Theme) {
    // !DONE
    return css`
      padding-right: calc(${t.btnIconSizeSmall} + ${t.btnWithIconPaddingLeftSmall} + ${t.btnWithIconPaddingLeftSmall});
    `;
  },

  withArrowIconRightMedium(t: Theme) {
    // !DONE
    return css`
      padding-right: calc(
        ${t.btnIconSizeMedium} + ${t.btnWithIconPaddingLeftMedium} + ${t.btnWithIconPaddingLeftMedium}
      );
    `;
  },

  withArrowIconRightLarge(t: Theme) {
    // !DONE
    return css`
      padding-right: calc(${t.btnIconSizeLarge} + ${t.btnWithIconPaddingLeftLarge} + ${t.btnWithIconPaddingLeftLarge});
    `;
  },

  withArrowIconLeftSmall(t: Theme) {
    // !DONE
    return css`
      padding-left: calc(${t.btnIconSizeSmall} + ${t.btnWithIconPaddingLeftSmall} + ${t.btnWithIconPaddingLeftSmall});
    `;
  },

  withArrowIconLeftMedium(t: Theme) {
    // !DONE
    return css`
      padding-left: calc(
        ${t.btnIconSizeMedium} + ${t.btnWithIconPaddingLeftMedium} + ${t.btnWithIconPaddingLeftMedium}
      );
    `;
  },

  withArrowIconLeftLarge(t: Theme) {
    // !DONE
    return css`
      padding-left: calc(${t.btnIconSizeLarge} + ${t.btnWithIconPaddingLeftLarge} + ${t.btnWithIconPaddingLeftLarge});
    `;
  },

  simulatedPress() {
    // !DONE
    return css`
      &:active .${globalClasses.caption} {
        transform: translateY(1px);
      }
    `;
  },

  outline() {
    // !DONE
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
    // !DONE
    return css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning},
        inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },

  outlineError(t: Theme) {
    // !DONE
    return css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError}, inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },

  outlineLink() {
    // !DONE
    return css`
      box-shadow: none;
      left: -2px;
      right: -2px;
      bottom: -2px;
      top: -2px;
    `;
  },

  outlineLinkWarning(t: Theme) {
    // !DONE
    return css`
      background-color: ${t.btnWarningSecondary};
    `;
  },

  outlineLinkError(t: Theme) {
    // !DONE
    return css`
      background-color: ${t.btnErrorSecondary};
    `;
  },

  sizeSmall(t: Theme) {
    // !DONE
    return css`
      border-radius: ${t.btnBorderRadiusSmall};

      ${buttonSizeMixin({
        fontSize: t.btnFontSizeSmall,
        lineHeight: t.btnLineHeightSmall,
        paddingX: t.btnPaddingXSmall,
        paddingY: t.btnPaddingYSmall,
        fontFamilyCompensation: t.fontFamilyCompensationBaseline,
      })};
    `;
  },

  sizeSmallIE11(t: Theme) {
    // !DONE
    return css`
      ${buttonSizeMixinIE11({
        fontSize: t.btnFontSizeSmall,
        paddingX: t.btnPaddingXSmall,
        paddingY: t.btnPaddingYSmall,
        fontFamilyCompensation: t.fontFamilyCompensationBaseline,
      })};
    `;
  },

  sizeMedium(t: Theme) {
    // !DONE
    return css`
      border-radius: ${t.btnBorderRadiusMedium};

      ${buttonSizeMixin({
        fontSize: t.btnFontSizeMedium,
        lineHeight: t.btnLineHeightMedium,
        paddingX: t.btnPaddingXMedium,
        paddingY: t.btnPaddingYMedium,
        fontFamilyCompensation: t.fontFamilyCompensationBaseline,
      })};
    `;
  },

  sizeMediumIE11(t: Theme) {
    // !DONE
    return css`
      ${buttonSizeMixinIE11({
        fontSize: t.btnFontSizeMedium,
        paddingX: t.btnPaddingXMedium,
        paddingY: t.btnPaddingYMedium,
        fontFamilyCompensation: t.fontFamilyCompensationBaseline,
      })};
    `;
  },

  sizeLarge(t: Theme) {
    // !DONE
    return css`
      border-radius: ${t.btnBorderRadiusLarge};

      ${buttonSizeMixin({
        fontSize: t.btnFontSizeLarge,
        lineHeight: t.btnLineHeightLarge,
        paddingX: t.btnPaddingXLarge,
        paddingY: t.btnPaddingYLarge,
        fontFamilyCompensation: t.fontFamilyCompensationBaseline,
      })};
    `;
  },

  sizeLargeIE11(t: Theme) {
    // !DONE
    return css`
      ${buttonSizeMixinIE11({
        fontSize: t.btnFontSizeLarge,
        paddingX: t.btnPaddingXLarge,
        paddingY: t.btnPaddingYLarge,
        fontFamilyCompensation: t.fontFamilyCompensationBaseline,
      })};
    `;
  },

  sizeSmallWithIcon(t: Theme) {
    // !DONE
    return css`
      padding-left: ${t.btnWithIconPaddingLeftSmall};
    `;
  },

  sizeMediumWithIcon(t: Theme) {
    // !DONE
    return css`
      padding-left: ${t.btnWithIconPaddingLeftMedium};
    `;
  },

  sizeLargeWithIcon(t: Theme) {
    // !DONE
    return css`
      padding-left: ${t.btnWithIconPaddingLeftLarge};
    `;
  },

  sizeSmallWithIconWithoutText(t: Theme) {
    // !DONE
    return css`
      padding-right: ${t.btnWithIconPaddingLeftSmall};
    `;
  },

  sizeMediumWithIconWithoutText(t: Theme) {
    // !DONE
    return css`
      padding-right: ${t.btnWithIconPaddingLeftMedium};
    `;
  },

  sizeLargeWithIconWithoutText(t: Theme) {
    // !DONE
    return css`
      padding-right: ${t.btnWithIconPaddingLeftLarge};
    `;
  },

  link(t: Theme) {
    // !DONE
    return css`
      background: none;
      border-radius: ${t.btnLinkBorderRadius};
      border: none;
      box-shadow: none;
      white-space: nowrap;
      color: ${t.btnLinkColor};
      display: inline;
      margin: 0;
      padding: 0 !important; // override size mixin
      height: auto !important; // override size mixin

      &:hover:enabled,
      &:active:enabled {
        color: ${t.btnLinkHoverColor};
        text-decoration: ${t.btnLinkHoverTextDecoration};
      }

      &:active:enabled {
        ${activeStyles.link(t)}
      }
    `;
  },

  linkLineHeight() {
    // !DONE
    return css`
      line-height: inherit !important; // override size mixin
    `;
  },

  linkLineHeightSafariFallback() {
    // !DONE
    return css`
      /* Safari overrides 'underline' and 'border' if 'line-height' is used */
      margin: -1px 0 -2px;
    `;
  },

  linkFocus(t: Theme) {
    // !DONE
    return css`
      & {
        color: ${t.btnLinkColor};
        text-decoration: ${t.btnLinkHoverTextDecoration};
      }
    `;
  },

  linkDisabled(t: Theme) {
    // !DONE
    return css`
      cursor: default;

      &,
      &:hover:enabled,
      &:active:enabled {
        color: ${t.btnLinkDisabledColor};
      }
    `;
  },

  focus(t: Theme) {
    // !DONE
    return css`
      position: relative;
      z-index: 2;

      &,
      &:hover:enabled,
      &:active:enabled,
      &:active:hover:enabled {
        box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
          0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus} !important; // override root:hover style
      }
    `;
  },

  disabled(t: Theme) {
    // !DONE
    return css`
      cursor: default;
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDisabledBorderColor};

      background-image: none;
      background-color: ${t.btnDisabledBg};
      color: ${t.btnDisabledTextColor};

      .${globalClasses.arrowHelper} {
        box-shadow: ${t.btnBorderWidth} 0 0 0 ${t.btnDisabledBorderColor};
      }
    `;
  },

  disabledWithoutOutline(t: Theme) {
    // !DONE
    return css`
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDisabledBg};
    `;
  },

  arrowWarning(t: Theme) {
    // !DONE
    return css`
      box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};

      ${arrowOutlineMixin({
        insetWidth: t.btnInsetWidth,
        outlineColor: t.btnBorderColorWarning,
        outlineWidth: t.btnOutlineWidth,
        insetColor: t.btnInsetColor,
      })}
    `;
  },

  arrowError(t: Theme) {
    // !DONE
    return css`
      box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};

      ${arrowOutlineMixin({
        insetWidth: t.btnInsetWidth,
        outlineColor: t.btnBorderColorError,
        outlineWidth: t.btnOutlineWidth,
        insetColor: t.btnInsetColor,
      })}
    `;
  },

  arrowFocus(t: Theme) {
    // !DONE
    return css`
      box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus};

      ${arrowOutlineMixin({
        insetWidth: t.btnInsetWidth,
        outlineColor: t.btnBorderColorFocus,
        outlineWidth: t.btnOutlineWidth,
        insetColor: t.btnOutlineColorFocus,
      })}
    `;
  },

  arrow() {
    // !DONE
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
    // !DONE
    return css`
      transform: scaleX(-1);
    `;
  },

  arrowIconRoot() {
    // !DONE
    return css`
      position: absolute;
      height: 100%;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: content-box;
    `;
  },

  arrowIconRootSmall(t: Theme) {
    // !DONE
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftSmall} 0 ${t.btnWithIconPaddingLeftSmall};
      width: ${t.btnIconSizeSmall};
    `;
  },

  arrowIconRootMedium(t: Theme) {
    // !DONE
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftMedium} 0 ${t.btnWithIconPaddingLeftMedium};
      width: ${t.btnIconSizeMedium};
    `;
  },

  arrowIconRootLarge(t: Theme) {
    // !DONE
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftLarge} 0 ${t.btnWithIconPaddingLeftLarge};
      width: ${t.btnIconSizeLarge};
    `;
  },

  arrowIconLeft() {
    // !DONE
    return css`
      left: 0;
    `;
  },

  default(t: Theme) {
    // !DONE
    return css`
      ${buttonUseMixin({
        btnBackground: t.btnDefaultBg,
        btnBackgroundStart: t.btnDefaultBgStart,
        btnBackgroundEnd: t.btnDefaultBgEnd,
        color: t.btnDefaultTextColor,
        borderColor: t.btnDefaultBorderColor,
        borderBottomColor: t.btnDefaultBorderBottomColor,
        borderWidth: t.btnBorderWidth,
      })};

      &:hover:enabled {
        ${buttonHoverMixin({
          btnBackground: t.btnDefaultHoverBg,
          btnBackgroundStart: t.btnDefaultHoverBgStart,
          btnBackgroundEnd: t.btnDefaultHoverBgEnd,
          borderColor: t.btnDefaultHoverBorderColor,
          borderBottomColor: t.btnDefaultHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active:enabled {
        ${activeStyles.default(t)};
      }
    `;
  },

  primary(t: Theme) {
    // !DONE
    return css`
      ${buttonUseMixin({
        btnBackground: t.btnPrimaryBg,
        btnBackgroundStart: t.btnPrimaryBgStart,
        btnBackgroundEnd: t.btnPrimaryBgEnd,
        color: t.btnPrimaryTextColor,
        borderColor: t.btnPrimaryBorderColor,
        borderBottomColor: t.btnPrimaryBorderBottomColor,
        borderWidth: t.btnBorderWidth,
      })};

      &:hover:enabled {
        ${buttonHoverMixin({
          btnBackground: t.btnPrimaryHoverBg,
          btnBackgroundStart: t.btnPrimaryHoverBgStart,
          btnBackgroundEnd: t.btnPrimaryHoverBgEnd,
          borderColor: t.btnPrimaryHoverBorderColor,
          borderBottomColor: t.btnPrimaryHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active:enabled {
        ${activeStyles.primary(t)}
      }
    `;
  },

  success(t: Theme) {
    // !DONE
    return css`
      ${buttonUseMixin({
        btnBackground: t.btnSuccessBg,
        btnBackgroundStart: t.btnSuccessBgStart,
        btnBackgroundEnd: t.btnSuccessBgEnd,
        color: t.btnSuccessTextColor,
        borderColor: t.btnSuccessBorderColor,
        borderBottomColor: t.btnSuccessBorderBottomColor,
        borderWidth: t.btnBorderWidth,
      })};

      &:hover:enabled {
        ${buttonHoverMixin({
          btnBackground: t.btnSuccessHoverBg,
          btnBackgroundStart: t.btnSuccessHoverBgStart,
          btnBackgroundEnd: t.btnSuccessHoverBgEnd,
          borderColor: t.btnSuccessHoverBorderColor,
          borderBottomColor: t.btnSuccessHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active:enabled {
        ${activeStyles.success(t)}
      }
    `;
  },

  danger(t: Theme) {
    // !DONE
    return css`
      ${buttonUseMixin({
        btnBackground: t.btnDangerBg,
        btnBackgroundStart: t.btnDangerBgStart,
        btnBackgroundEnd: t.btnDangerBgEnd,
        color: t.btnDangerTextColor,
        borderColor: t.btnDangerBorderColor,
        borderBottomColor: t.btnDangerBorderBottomColor,
        borderWidth: t.btnBorderWidth,
      })};

      &:hover:enabled {
        ${buttonHoverMixin({
          btnBackground: t.btnDangerHoverBg,
          btnBackgroundStart: t.btnDangerHoverBgStart,
          btnBackgroundEnd: t.btnDangerHoverBgEnd,
          borderColor: t.btnDangerHoverBorderColor,
          borderBottomColor: t.btnDangerHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active:enabled {
        ${activeStyles.danger(t)}
      }
    `;
  },

  pay(t: Theme) {
    // !DONE
    return css`
      ${buttonUseMixin({
        btnBackground: t.btnPayBg,
        btnBackgroundStart: t.btnPayBgStart,
        btnBackgroundEnd: t.btnPayBgEnd,
        color: t.btnPayTextColor,
        borderColor: t.btnPayBorderColor,
        borderBottomColor: t.btnPayBorderBottomColor,
        borderWidth: t.btnBorderWidth,
      })};

      &:hover:enabled {
        ${buttonHoverMixin({
          btnBackground: t.btnPayHoverBg,
          btnBackgroundStart: t.btnPayHoverBgStart,
          btnBackgroundEnd: t.btnPayHoverBgEnd,
          borderColor: t.btnPayHoverBorderColor,
          borderBottomColor: t.btnPayHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active:enabled {
        ${activeStyles.pay(t)}
      }
    `;
  },

  text(t: Theme) {
    // !DONE
    return css`
      &,
      &:enabled,
      &:hover:enabled {
        box-shadow: none;
        .${globalClasses.arrowHelperTop}, .${globalClasses.arrowHelperBottom} {
          box-shadow: none !important;
        }
      }

      ${buttonUseMixin({
        btnBackground: t.btnTextBg,
        color: t.btnTextTextColor,
        borderColor: t.btnTextBorderColor,
        borderWidth: t.btnBorderWidth,
      })};

      &:hover:enabled {
        ${buttonHoverMixin({
          btnBackground: t.btnTextHoverBg,
          borderColor: t.btnTextHoverBorderColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active:enabled {
        ${activeStyles.text(t)}
      }
    `;
  },

  backless(t: Theme) {
    // !DONE
    return css`
      ${buttonUseMixin({
        btnBackground: t.btnBacklessBg,
        color: t.btnBacklessTextColor,
        borderColor: t.btnBacklessBorderColor,
        borderWidth: t.btnBorderWidth,
      })};

      color: ${t.btnDefaultTextColor};
      background: transparent;

      &:hover:enabled {
        ${buttonHoverMixin({
          btnBackground: t.btnBacklessHoverBg,
          borderColor: t.btnBacklessHoverBorderColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active:enabled {
        ${activeStyles.backless(t)}
      }
    `;
  },

  checked(t: Theme) {
    // !DONE
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

      &:hover:enabled,
      &:active:enabled,
      &:hover:active:enabled {
        ${checkedStyles}
      }
    `;
  },

  checked2022(t: Theme) {
    // !DONE
    const checkedStyles = `
      background-image: none;
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDefaultCheckedBorderColor} !important;
      background-color: ${t.btnCheckedBg} !important;
      color: ${t.btnCheckedTextColor} !important;

      .${globalClasses.innerShadow} {
        box-shadow: ${t.btnCheckedShadow};
      }

      .${globalClasses.arrowHelper} {
        box-shadow: ${t.btnBorderWidth} 0 0 ${t.btnDefaultCheckedBorderColor};

        &.${globalClasses.arrowHelperTop} {
          background-image: ${t.btnArrowBgImageChecked};
        }
      }

      :enabled svg {
        color: ${t.btnCheckedTextColor} !important;
      }
      :hover:enabled svg {
        color: ${t.btnCheckedTextColor} !important;
      }
    `;

    return css`
      ${checkedStyles}

      &:hover:enabled,
      &:active:enabled,
      &:hover:active:enabled {
        ${checkedStyles}
      }
    `;
  },

  checkedFocused(t: Theme) {
    // !DONE
    return css`
      &:hover:enabled,
      &:hover:active:enabled {
        box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
          0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus} !important;
        border-color: ${t.btnBorderColorFocus} !important;
      }
    `;
  },

  checkedDisabled(t: Theme) {
    // !DONE
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

  checkedDisabled2022(t: Theme) {
    // !DONE
    return css`
      svg {
        color: ${t.btnCheckedDisabledColor} !important;
      }
    `;
  },

  caption() {
    // !DONE
    return css`
      position: relative;
      white-space: nowrap;
      display: inline-block;
      width: 100%;
      vertical-align: top;
    `;
  },

  captionLink() {
    // !DONE
    return css`
      display: inline;
      transform: none !important; // override root:active style
    `;
  },

  captionTranslated() {
    // !DONE
    return css`
      transform: translateY(1px);
    `;
  },

  captionDisabled() {
    // !DONE
    return css`
      transform: none !important; // override root:active style
    `;
  },

  wrap(t: Theme) {
    // !DONE
    return css`
      box-sizing: border-box;
      display: inline-block;
      line-height: normal;
      padding: ${t.btnBorderWidth};
    `;
  },

  wrapSmall(t: Theme) {
    // !DONE
    return css`
      height: ${t.btnHeightSmall};
    `;
  },

  wrapMedium(t: Theme) {
    // !DONE
    return css`
      height: ${t.btnHeightMedium};
    `;
  },

  wrapLarge(t: Theme) {
    // !DONE
    return css`
      height: ${t.btnHeightLarge};
    `;
  },

  narrow() {
    // !DONE
    return css`
      padding-left: 5px;
      padding-right: 5px;
    `;
  },

  noPadding() {
    // !DONE
    return css`
      padding-left: 0;
      padding-right: 0;
    `;
  },

  noRightPadding() {
    // !DONE
    return css`
      padding-right: 0;
    `;
  },

  iconNoRightMargin() {
    // !DONE
    return css`
      margin-right: 0;
    `;
  },

  iconLink(t: Theme) {
    // !DONE
    return css`
      margin-right: ${t.btnLinkIconMarginRight};
    `;
  },

  wrapLink() {
    // !DONE
    return css`
      padding: 0;
    `;
  },

  wrapArrow() {
    // !DONE
    return css`
      margin-right: 10px;
    `;
  },

  wrapArrowLeft() {
    // !DONE
    return css`
      margin-right: 0;
      margin-left: 10px;
    `;
  },

  icon(t: Theme) {
    // !DONE
    const space = isTheme2022(t) ? `'${ZERO_WIDTH_SPACE_CSS}'` : null;
    return css`
      display: inline-block;

      &::before {
        content: ${space};
      }
    `;
  },
  iconSmall(t: Theme) {
    // !DONE
    return css`
      width: ${t.btnIconSizeSmall};
      margin-right: ${t.btnIconGapSmall};
    `;
  },
  iconMedium(t: Theme) {
    // !DONE
    return css`
      width: ${t.btnIconSizeMedium};
      margin-right: ${t.btnIconGapMedium};
    `;
  },
  iconLarge(t: Theme) {
    // !DONE
    return css`
      width: ${t.btnIconSizeLarge};
      margin-right: ${t.btnIconGapLarge};
    `;
  },

  borderless() {
    // !DONE
    return css`
      &:enabled,
      &:active:hover:enabled,
      &:hover:enabled {
        box-shadow: none !important; // override root:hover style
        .${globalClasses.arrowHelperTop}, .${globalClasses.arrowHelperBottom} {
          box-shadow: none !important; // override root:hover style
        }
      }
    `;
  },

  borderless2022() {
    // !DONE
    return css`
      &,
      &:active:hover,
      &:hover {
        box-shadow: none !important; // override root:hover style
      }
    `;
  },

  loading() {
    // !DONE
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
    // !DONE
    return css`
      visibility: hidden;
    `;
  },
});

export const activeStyles = memoizeStyle({
  default(t: Theme) {
    // !DONE
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnDefaultActiveBg,
          btnShadow: t.btnDefaultActiveShadow,
          borderColor: t.btnDefaultActiveBorderColor,
          borderTopColor: t.btnDefaultActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
          arrowBgImage: t.btnArrowBgImageActive,
        })};
      }
    `;
  },

  primary(t: Theme) {
    // !DONE
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnPrimaryActiveBg,
          btnShadow: t.btnPrimaryActiveShadow,
          borderColor: t.btnPrimaryActiveBorderColor,
          borderTopColor: t.btnPrimaryActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
          arrowBgImage: t.btnArrowBgImageActive,
        })};
      }
    `;
  },

  success(t: Theme) {
    // !DONE
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnSuccessActiveBg,
          btnShadow: t.btnSuccessActiveShadow,
          borderColor: t.btnSuccessActiveBorderColor,
          borderTopColor: t.btnSuccessActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
          arrowBgImage: t.btnArrowBgImageActive,
        })};
      }
    `;
  },

  danger(t: Theme) {
    // !DONE
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnDangerActiveBg,
          btnShadow: t.btnDangerActiveShadow,
          borderColor: t.btnDangerActiveBorderColor,
          borderTopColor: t.btnDangerActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
          arrowBgImage: t.btnArrowBgImageActive,
        })};
      }
    `;
  },

  pay(t: Theme) {
    // !DONE
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnPayActiveBg,
          btnShadow: t.btnPayActiveShadow,
          borderColor: t.btnPayActiveBorderColor,
          borderTopColor: t.btnPayActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
          arrowBgImage: t.btnArrowBgImageActive,
        })};
      }
    `;
  },

  link(t: Theme) {
    // !DONE
    return css`
      & {
        color: ${t.btnLinkActiveColor};
      }
    `;
  },

  text(t: Theme) {
    // !DONE
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnTextActiveBg,
          borderColor: t.btnTextActiveBg,
          borderWidth: t.btnBorderWidth,
          arrowBgImage: t.btnArrowBgImageActive,
        })};
      }
    `;
  },

  backless(t: Theme) {
    // !DONE
    return css`
      &,
      &:hover {
        background: ${t.btnBacklessActiveBg};
      }
    `;
  },
});
