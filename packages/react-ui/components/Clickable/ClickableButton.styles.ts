import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { buttonActiveMixin, buttonHoverMixin, buttonSizeMixin, buttonUseMixin } from '../Button/Button.mixins';

import { globalClasses } from './Clickable.styles';

export const buttonStyles = memoizeStyle({
  buttonRoot(t: Theme) {
    return css`
      transition: background-color ${t.transitionDuration} ${t.transitionTimingFunction}
        ${t.btnBorderColorTransition ? `, ${t.btnBorderColorTransition}` : ''};

      background-clip: ${t.btnBackgroundClip};
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      display: inline-block;
      position: relative;
      text-align: center;
      width: 100%;

      width: . ${globalClasses.innerShadow} {
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

  buttonDefault(t: Theme) {
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
        ${activeStyles.buttonDefault(t)};
      }
    `;
  },
  buttonPrimary(t: Theme) {
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
        ${activeStyles.buttonPrimary(t)}
      }
    `;
  },
  buttonSuccess(t: Theme) {
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
        ${activeStyles.buttonSuccess(t)}
      }
    `;
  },
  buttonDanger(t: Theme) {
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
        ${activeStyles.buttonDanger(t)}
      }
    `;
  },
  buttonPay(t: Theme) {
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
        ${activeStyles.buttonPay(t)}
      }
    `;
  },
  buttonText(t: Theme) {
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
        ${activeStyles.buttonText(t)}
      }
    `;
  },
  buttonBackless(t: Theme) {
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
        ${activeStyles.buttonBackless(t)}
      }
    `;
  },

  buttonSizeSmall(t: Theme) {
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
  buttonSizeMedium(t: Theme) {
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
  buttonSizeLarge(t: Theme) {
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

  buttonSizeSmallWithIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftSmall};
    `;
  },
  buttonSizeMediumWithIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftMedium};
    `;
  },
  buttonSizeLargeWithIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftLarge};
    `;
  },

  buttonSizeSmallWithIconWithoutText(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingLeftSmall};
    `;
  },
  buttonSizeMediumWithIconWithoutText(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingLeftMedium};
    `;
  },
  buttonSizeLargeWithIconWithoutText(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingLeftLarge};
    `;
  },
});

export const activeStyles = memoizeStyle({
  buttonDefault(t: Theme) {
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
  buttonPrimary(t: Theme) {
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
  buttonSuccess(t: Theme) {
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
  buttonDanger(t: Theme) {
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
  buttonPay(t: Theme) {
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
  buttonLink(t: Theme) {
    return css`
      & {
        color: ${t.btnLinkActiveColor};
      }
    `;
  },
  buttonText(t: Theme) {
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
  buttonBackless(t: Theme) {
    return css`
      &,
      &:hover {
        background: ${t.btnBacklessActiveBg};
      }
    `;
  },
});
