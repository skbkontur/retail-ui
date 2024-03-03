import { Theme } from '../../lib/theming/Theme';
import { css, cx, memoizeStyle, prefix } from '../../lib/theming/Emotion';

import { GetStylesBase } from './Clickable.styles';
import { ClickableProps } from './Clickable';
import { buttonActiveMixin, buttonHoverMixin, buttonSizeMixin, buttonUseMixin } from './ClickableButton.mixins';

export const buttonGlobalClasses = prefix('clickable-button')({
  arrow: 'arrow',
  icon: 'icon',
});

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

      &:hover svg {
        color: ${t.btnIconHoverColor};
      }
      &[aria-disabled='true'] svg {
        color: ${t.btnIconDisabledColor};
      }
      & svg {
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

      &:hover {
        ${buttonHoverMixin({
          btnBackground: t.btnDefaultHoverBg,
          btnBackgroundStart: t.btnDefaultHoverBgStart,
          btnBackgroundEnd: t.btnDefaultHoverBgEnd,
          borderColor: t.btnDefaultHoverBorderColor,
          borderBottomColor: t.btnDefaultHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active {
        ${buttonActiveStyles.buttonDefault(t)};
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

      &:hover {
        ${buttonHoverMixin({
          btnBackground: t.btnPrimaryHoverBg,
          btnBackgroundStart: t.btnPrimaryHoverBgStart,
          btnBackgroundEnd: t.btnPrimaryHoverBgEnd,
          borderColor: t.btnPrimaryHoverBorderColor,
          borderBottomColor: t.btnPrimaryHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active {
        ${buttonActiveStyles.buttonPrimary(t)}
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

      &:hover {
        ${buttonHoverMixin({
          btnBackground: t.btnSuccessHoverBg,
          btnBackgroundStart: t.btnSuccessHoverBgStart,
          btnBackgroundEnd: t.btnSuccessHoverBgEnd,
          borderColor: t.btnSuccessHoverBorderColor,
          borderBottomColor: t.btnSuccessHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active {
        ${buttonActiveStyles.buttonSuccess(t)}
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

      &:hover {
        ${buttonHoverMixin({
          btnBackground: t.btnDangerHoverBg,
          btnBackgroundStart: t.btnDangerHoverBgStart,
          btnBackgroundEnd: t.btnDangerHoverBgEnd,
          borderColor: t.btnDangerHoverBorderColor,
          borderBottomColor: t.btnDangerHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active {
        ${buttonActiveStyles.buttonDanger(t)}
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

      &:hover {
        ${buttonHoverMixin({
          btnBackground: t.btnPayHoverBg,
          btnBackgroundStart: t.btnPayHoverBgStart,
          btnBackgroundEnd: t.btnPayHoverBgEnd,
          borderColor: t.btnPayHoverBorderColor,
          borderBottomColor: t.btnPayHoverBorderBottomColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active {
        ${buttonActiveStyles.buttonPay(t)}
      }
    `;
  },
  buttonText(t: Theme) {
    return css`
      &,
      &:hover {
        box-shadow: none;
      }

      ${buttonUseMixin({
        btnBackground: t.btnTextBg,
        color: t.btnTextTextColor,
        borderColor: t.btnTextBorderColor,
        borderWidth: t.btnBorderWidth,
      })};

      &:hover {
        ${buttonHoverMixin({
          btnBackground: t.btnTextHoverBg,
          borderColor: t.btnTextHoverBorderColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active {
        ${buttonActiveStyles.buttonText(t)}
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

      &:hover {
        ${buttonHoverMixin({
          btnBackground: t.btnBacklessHoverBg,
          borderColor: t.btnBacklessHoverBorderColor,
          borderWidth: t.btnBorderWidth,
        })};
      }

      &:active {
        ${buttonActiveStyles.buttonBackless(t)}
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
  buttonSizeSmallWithRightIcon(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingRightSmall};
    `;
  },
  buttonSizeSmallWithIconWithoutText(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftSmall};
      padding-right: ${t.btnWithIconPaddingRightSmall};
    `;
  },

  buttonSizeMediumWithLeftIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftMedium};
    `;
  },
  buttonSizeMediumWithRightIcon(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingRightMedium};
    `;
  },
  buttonSizeMediumWithIconWithoutText(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftMedium};
      padding-right: ${t.btnWithIconPaddingRightMedium};
    `;
  },

  buttonSizeLargeWithLeftIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftLarge};
    `;
  },
  buttonSizeLargeWithRightIcon(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingRightLarge};
    `;
  },
  buttonSizeLargeWithIconWithoutText(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftLarge};
      padding-right: ${t.btnWithIconPaddingRightLarge};
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
      pointer-events: none;

      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDisabledBorderColor};

      background-image: none;
      background-color: ${t.btnDisabledBg};
      color: ${t.btnDisabledTextColor};
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
      &:hover,
      &:active,
      &:active:hover {
        box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
          0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus} !important; // override root:hover style
      }
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
});

export const buttonActiveStyles = memoizeStyle({
  buttonDefault(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnDefaultActiveBg,
          borderColor: t.btnDefaultActiveBorderColor,
          borderTopColor: t.btnDefaultActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
        })};
      }
    `;
  },
  buttonPrimary(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnPrimaryActiveBg,
          borderColor: t.btnPrimaryActiveBorderColor,
          borderTopColor: t.btnPrimaryActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
        })};
      }
    `;
  },
  buttonSuccess(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnSuccessActiveBg,
          borderColor: t.btnSuccessActiveBorderColor,
          borderTopColor: t.btnSuccessActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
        })};
      }
    `;
  },
  buttonDanger(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnDangerActiveBg,
          borderColor: t.btnDangerActiveBorderColor,
          borderTopColor: t.btnDangerActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
        })};
      }
    `;
  },
  buttonPay(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin({
          btnBackground: t.btnPayActiveBg,
          borderColor: t.btnPayActiveBorderColor,
          borderTopColor: t.btnPayActiveBorderTopColor,
          borderWidth: t.btnBorderWidth,
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
  const hasIconAndNoContent = (!!leftIcon || !!rightIcon) && !children;

  if (size === 'large') {
    return {
      [buttonStyles.buttonSizeLarge(theme)]: true,
      [buttonStyles.buttonSizeLargeWithLeftIcon(theme)]: !!leftIcon,
      [buttonStyles.buttonSizeLargeWithRightIcon(theme)]: !!rightIcon,
      [buttonStyles.buttonSizeLargeWithIconWithoutText(theme)]: hasIconAndNoContent,
    };
  }

  if (size === 'medium') {
    return {
      [buttonStyles.buttonSizeMedium(theme)]: true,
      [buttonStyles.buttonSizeMediumWithLeftIcon(theme)]: !!leftIcon,
      [buttonStyles.buttonSizeMediumWithRightIcon(theme)]: !!rightIcon,
      [buttonStyles.buttonSizeMediumWithIconWithoutText(theme)]: hasIconAndNoContent,
    };
  }

  return {
    [buttonStyles.buttonSizeSmall(theme)]: true,
    [buttonStyles.buttonSizeSmallWithLeftIcon(theme)]: !!leftIcon,
    [buttonStyles.buttonSizeSmallWithRightIcon(theme)]: !!rightIcon,
    [buttonStyles.buttonSizeSmallWithIconWithoutText(theme)]: hasIconAndNoContent,
  };
};

interface GetButtonStylesArgs
  extends GetStylesBase,
    Pick<ClickableProps, 'arrow' | 'size' | 'isNarrow' | 'isDisabled' | 'isLoading' | 'isBorderless' | 'isActive'> {
  buttonSize: Record<string, boolean>;
  isFocused: boolean;
  isNotInteractive: boolean;
}

export const getButtonStyles = ({
  use,
  buttonSize,
  theme,
  arrow,
  size,
  isNarrow,
  isBorderless,
  isFocused,
  isActive,
  isNotInteractive,
}: GetButtonStylesArgs) => {
  const active = !isNotInteractive && isActive;
  const isUseStateWithoutOutlineInDisabledState = !['default', 'backless'].includes(use ?? '');

  return cx({
    // root
    [buttonStyles.buttonRoot(theme)]: true,
    // use
    [buttonStyles.buttonDefault(theme)]: use === 'default' || use === undefined,
    [buttonStyles.buttonPrimary(theme)]: use === 'primary',
    [buttonStyles.buttonSuccess(theme)]: use === 'success',
    [buttonStyles.buttonDanger(theme)]: use === 'danger',
    [buttonStyles.buttonPay(theme)]: use === 'pay',
    [buttonStyles.buttonText(theme)]: use === 'text',
    [buttonStyles.buttonBackless(theme)]: use === 'backless',
    // active
    [buttonActiveStyles.buttonDefault(theme)]: (use === 'default' || use === undefined) && active,
    [buttonActiveStyles.buttonPrimary(theme)]: use === 'primary' && active,
    [buttonActiveStyles.buttonSuccess(theme)]: use === 'success' && active,
    [buttonActiveStyles.buttonDanger(theme)]: use === 'danger' && active,
    [buttonActiveStyles.buttonPay(theme)]: use === 'pay' && active,
    [buttonActiveStyles.buttonText(theme)]: use === 'text' && active,
    [buttonActiveStyles.buttonBackless(theme)]: use === 'backless' && active,
    // focused
    [buttonStyles.buttonFocus(theme)]: isFocused,
    // size
    ...buttonSize,
    // narrow
    [buttonStyles.buttonNarrow()]: isNarrow,
    // arrow
    [buttonStyles.buttonWithArrowIconRightSmall(theme)]: arrow === 'right' && size === 'small',
    [buttonStyles.buttonWithArrowIconRightMedium(theme)]: arrow === 'right' && size === 'medium',
    [buttonStyles.buttonWithArrowIconRightLarge(theme)]: arrow === 'right' && size === 'large',
    [buttonStyles.buttonWithArrowIconLeftSmall(theme)]: arrow === 'left' && size === 'small',
    [buttonStyles.buttonWithArrowIconLeftMedium(theme)]: arrow === 'left' && size === 'medium',
    [buttonStyles.buttonWithArrowIconLeftLarge(theme)]: arrow === 'left' && size === 'large',
    // disabled
    [buttonStyles.buttonDisabled(theme)]: isNotInteractive,
    [buttonStyles.buttonDisabledWithoutOutline(theme)]: isUseStateWithoutOutlineInDisabledState && isNotInteractive,
    // borderless
    [buttonStyles.buttonBorderless()]: isBorderless && (!isFocused || isNotInteractive),
  });
};
