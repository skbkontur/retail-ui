import { Theme } from '../../lib/theming/Theme';
import { isFirefox } from '../../lib/client';
import { css, cx, memoizeStyle } from '../../lib/theming/Emotion';
import {
  arrowOutlineMixin,
  buttonActiveMixin,
  buttonHoverMixin,
  buttonSizeMixin,
  buttonUseMixin,
} from '../Button/Button.mixins';

import { GetStylesBase, globalClasses } from './Clickable.styles';
import { ClickableProps } from './Clickable';

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
  buttonBorderless() {
    return css`
      &,
      &:active:hover,
      &:hover {
        box-shadow: none !important; // override root:hover style
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

  buttonSizeSmallWithLeftIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftSmall};
    `;
  },
  buttonSizeMediumWithLeftIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftMedium};
    `;
  },
  buttonSizeLargeWithLeftIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftLarge};
    `;
  },

  buttonSizeSmallWithRightIconOrWithoutText(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingRightSmall};
    `;
  },
  buttonSizeMediumWithRightIconOrWithoutText(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingRightMedium};
    `;
  },
  buttonSizeLargeWithRightIconOrWithoutText(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingRightLarge};
    `;
  },

  buttonLoading() {
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

  buttonCaption() {
    return css`
      position: relative;
      white-space: nowrap;
      display: inline-block;
      width: 100%;
      vertical-align: top;
    `;
  },
  buttonCaptionDisabled() {
    return css`
      transform: none !important; // override root:active style
    `;
  },

  buttonVisibilityHidden() {
    return css`
      visibility: hidden;
    `;
  },

  buttonOutline() {
    return css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `;
  },
  buttonOutlineWarning(t: Theme) {
    return css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning},
        inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },
  buttonOutlineError(t: Theme) {
    return css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError}, inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },

  buttonWithArrowIconRightSmall(t: Theme) {
    return css`
      padding-right: calc(${t.btnIconSizeSmall} + ${t.btnWithIconPaddingLeftSmall} + ${t.btnWithIconPaddingLeftSmall});
    `;
  },
  buttonWithArrowIconRightMedium(t: Theme) {
    return css`
      padding-right: calc(
        ${t.btnIconSizeMedium} + ${t.btnWithIconPaddingLeftMedium} + ${t.btnWithIconPaddingLeftMedium}
      );
    `;
  },
  buttonWithArrowIconRightLarge(t: Theme) {
    return css`
      padding-right: calc(${t.btnIconSizeLarge} + ${t.btnWithIconPaddingLeftLarge} + ${t.btnWithIconPaddingLeftLarge});
    `;
  },
  buttonWithArrowIconLeftSmall(t: Theme) {
    return css`
      padding-left: calc(${t.btnIconSizeSmall} + ${t.btnWithIconPaddingLeftSmall} + ${t.btnWithIconPaddingLeftSmall});
    `;
  },
  buttonWithArrowIconLeftMedium(t: Theme) {
    return css`
      padding-left: calc(
        ${t.btnIconSizeMedium} + ${t.btnWithIconPaddingLeftMedium} + ${t.btnWithIconPaddingLeftMedium}
      );
    `;
  },
  buttonWithArrowIconLeftLarge(t: Theme) {
    return css`
      padding-left: calc(${t.btnIconSizeLarge} + ${t.btnWithIconPaddingLeftLarge} + ${t.btnWithIconPaddingLeftLarge});
    `;
  },

  buttonArrowWarning(t: Theme) {
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
  buttonArrowError(t: Theme) {
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
  buttonArrowFocus(t: Theme) {
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
  buttonArrow() {
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
  buttonArrowLeft() {
    return css`
      transform: scaleX(-1);
    `;
  },
  buttonArrowIconRoot() {
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
  buttonArrowIconRootSmall(t: Theme) {
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftSmall} 0 ${t.btnWithIconPaddingLeftSmall};
      width: ${t.btnIconSizeSmall};
    `;
  },
  buttonArrowIconRootMedium(t: Theme) {
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftMedium} 0 ${t.btnWithIconPaddingLeftMedium};
      width: ${t.btnIconSizeMedium};
    `;
  },
  buttonArrowIconRootLarge(t: Theme) {
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftLarge} 0 ${t.btnWithIconPaddingLeftLarge};
      width: ${t.btnIconSizeLarge};
    `;
  },
  buttonArrowIconLeft() {
    return css`
      left: 0;
    `;
  },

  buttonWrap(t: Theme) {
    return css`
      box-sizing: border-box;
      display: inline-block;
      line-height: normal;
      padding: ${t.btnBorderWidth};
    `;
  },
  buttonWrapSmall(t: Theme) {
    return css`
      height: ${t.btnHeightSmall};
    `;
  },
  buttonWrapMedium(t: Theme) {
    return css`
      height: ${t.btnHeightMedium};
    `;
  },
  buttonWrapLarge(t: Theme) {
    return css`
      height: ${t.btnHeightLarge};
    `;
  },

  buttonNarrow() {
    return css`
      padding-left: 5px;
      padding-right: 5px;
    `;
  },

  buttonDisabled(t: Theme) {
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

  buttonDisabledWithoutOutline(t: Theme) {
    return css`
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDisabledBg};
    `;
  },

  buttonFocus(t: Theme) {
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

interface GetButtonSizeArgs extends Pick<ClickableProps, 'size' | 'leftIcon' | 'rightIcon' | 'children'> {
  theme: Theme;
}

export const getButtonSize = ({ size, leftIcon, rightIcon, children, theme }: GetButtonSizeArgs) => {
  const hasIcon = !!leftIcon || !!rightIcon;
  const hasRightPadding = !!rightIcon || (hasIcon && !children);

  if (size === 'large') {
    return cx(buttonStyles.buttonSizeLarge(theme), {
      [buttonStyles.buttonSizeLargeWithLeftIcon(theme)]: !!leftIcon,
      [buttonStyles.buttonSizeLargeWithRightIconOrWithoutText(theme)]: hasRightPadding,
    });
  }

  if (size === 'medium') {
    return cx(buttonStyles.buttonSizeMedium(theme), {
      [buttonStyles.buttonSizeMediumWithLeftIcon(theme)]: !!leftIcon,
      [buttonStyles.buttonSizeMediumWithRightIconOrWithoutText(theme)]: hasRightPadding,
    });
  }

  return cx(buttonStyles.buttonSizeSmall(theme), {
    [buttonStyles.buttonSizeSmallWithLeftIcon(theme)]: !!leftIcon,
    [buttonStyles.buttonSizeSmallWithRightIconOrWithoutText(theme)]: hasRightPadding,
  });
};

interface GetButtonStylesArgs
  extends GetStylesBase,
    Pick<ClickableProps, 'arrow' | 'size' | 'isNarrow' | 'isDisabled' | 'isLoading' | 'isBorderless' | 'isActive'> {
  buttonSize: string;
  isFocused: boolean;
}

export const getButtonStyles = ({
  use,
  buttonSize,
  theme,
  arrow,
  size,
  isNarrow,
  isDisabled,
  isLoading,
  isBorderless,
  isFocused,
  isActive,
}: GetButtonStylesArgs) => {
  const disabled = isDisabled || isLoading;
  const isUseStateWithoutOutlineInDisabledState = !['default', 'backless'].includes(use ?? '');

  const disableDependent = disabled
    ? cx({
        [buttonStyles.buttonDisabled(theme)]: true,
        [buttonStyles.buttonDisabledWithoutOutline(theme)]: isUseStateWithoutOutlineInDisabledState,
        [buttonStyles.buttonBorderless()]: isBorderless,
      })
    : cx({
        [activeStyles.buttonDefault(theme)]: (use === 'default' || use === undefined) && isActive,
        [activeStyles.buttonPrimary(theme)]: use === 'primary' && isActive,
        [activeStyles.buttonSuccess(theme)]: use === 'success' && isActive,
        [activeStyles.buttonDanger(theme)]: use === 'danger' && isActive,
        [activeStyles.buttonPay(theme)]: use === 'pay' && isActive,
        [activeStyles.buttonText(theme)]: use === 'text' && isActive,
        [activeStyles.buttonBackless(theme)]: use === 'backless' && isActive,
        [buttonStyles.buttonFocus(theme)]: isFocused,
        [buttonStyles.buttonBorderless()]: isBorderless && !isFocused,
      });

  return cx({
    [buttonSize]: true,
    [disableDependent]: true,
    [buttonStyles.buttonRoot(theme)]: true,
    [buttonStyles.buttonNarrow()]: isNarrow,
    [buttonStyles.buttonDefault(theme)]: use === 'default' || use === undefined,
    [buttonStyles.buttonPrimary(theme)]: use === 'primary',
    [buttonStyles.buttonSuccess(theme)]: use === 'success',
    [buttonStyles.buttonDanger(theme)]: use === 'danger',
    [buttonStyles.buttonPay(theme)]: use === 'pay',
    [buttonStyles.buttonText(theme)]: use === 'text',
    [buttonStyles.buttonBackless(theme)]: use === 'backless',
    [buttonStyles.buttonWithArrowIconRightSmall(theme)]: arrow === 'right' && size === 'small',
    [buttonStyles.buttonWithArrowIconRightMedium(theme)]: arrow === 'right' && size === 'medium',
    [buttonStyles.buttonWithArrowIconRightLarge(theme)]: arrow === 'right' && size === 'large',
    [buttonStyles.buttonWithArrowIconLeftSmall(theme)]: arrow === 'left' && size === 'small',
    [buttonStyles.buttonWithArrowIconLeftMedium(theme)]: arrow === 'left' && size === 'medium',
    [buttonStyles.buttonWithArrowIconLeftLarge(theme)]: arrow === 'left' && size === 'large',
  });
};
