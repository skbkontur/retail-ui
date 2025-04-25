import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';

import {
  buttonUseMixin,
  buttonHoverMixin,
  buttonActiveMixin,
  buttonSizeMixin,
  buttonSizeMixinIE11,
} from './Button.mixins';

export const globalClasses = prefix('button')({
  root: 'root',
  arrow: 'arrow',
  caption: 'caption',
  text: 'text',
  innerShadow: 'inner-shadow',
  disabled: 'disabled',
});

export const styles = memoizeStyle({
  root(t: Theme) {
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

      &:hover svg {
        color: ${t.btnIconHoverColor};
      }
      &.${globalClasses.disabled} svg {
        color: ${t.btnIconDisabledColor};
      }
      & svg {
        color: ${t.btnIconColor};
      }
    `;
  },

  withArrowIconRightSmall(t: Theme) {
    return css`
      padding-right: calc(${t.btnIconSizeSmall} + ${t.btnWithIconPaddingLeftSmall} + ${t.btnWithIconPaddingLeftSmall});
    `;
  },

  withArrowIconRightMedium(t: Theme) {
    return css`
      padding-right: calc(
        ${t.btnIconSizeMedium} + ${t.btnWithIconPaddingLeftMedium} + ${t.btnWithIconPaddingLeftMedium}
      );
    `;
  },

  withArrowIconRightLarge(t: Theme) {
    return css`
      padding-right: calc(${t.btnIconSizeLarge} + ${t.btnWithIconPaddingLeftLarge} + ${t.btnWithIconPaddingLeftLarge});
    `;
  },

  withArrowIconLeftSmall(t: Theme) {
    return css`
      padding-left: calc(${t.btnIconSizeSmall} + ${t.btnWithIconPaddingLeftSmall} + ${t.btnWithIconPaddingLeftSmall});
    `;
  },

  withArrowIconLeftMedium(t: Theme) {
    return css`
      padding-left: calc(
        ${t.btnIconSizeMedium} + ${t.btnWithIconPaddingLeftMedium} + ${t.btnWithIconPaddingLeftMedium}
      );
    `;
  },

  withArrowIconLeftLarge(t: Theme) {
    return css`
      padding-left: calc(${t.btnIconSizeLarge} + ${t.btnWithIconPaddingLeftLarge} + ${t.btnWithIconPaddingLeftLarge});
    `;
  },

  simulatedPress() {
    return css`
      &:active .${globalClasses.caption} {
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
      box-shadow:
        0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning},
        inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },

  outlineError(t: Theme) {
    return css`
      box-shadow:
        0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError},
        inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },

  outlineLink() {
    return css`
      box-shadow: none;
      left: -2px;
      right: -2px;
      bottom: -2px;
      top: -2px;
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

      ${buttonSizeMixin(t.btnFontSizeSmall, t.btnLineHeightSmall, t.btnPaddingXSmall, t.btnPaddingYSmall)};
    `;
  },

  sizeSmallIE11(t: Theme) {
    return css`
      ${buttonSizeMixinIE11(t.btnPaddingXSmall, t.btnPaddingYSmall)};
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      border-radius: ${t.btnBorderRadiusMedium};

      ${buttonSizeMixin(t.btnFontSizeMedium, t.btnLineHeightMedium, t.btnPaddingXMedium, t.btnPaddingYMedium)};
    `;
  },

  sizeMediumIE11(t: Theme) {
    return css`
      ${buttonSizeMixinIE11(t.btnPaddingXMedium, t.btnPaddingYMedium)};
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      border-radius: ${t.btnBorderRadiusLarge};

      ${buttonSizeMixin(t.btnFontSizeLarge, t.btnLineHeightLarge, t.btnPaddingXLarge, t.btnPaddingYLarge)};
    `;
  },

  sizeLargeIE11(t: Theme) {
    return css`
      ${buttonSizeMixinIE11(t.btnPaddingXLarge, t.btnPaddingYLarge)};
    `;
  },

  sizeSmallWithIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftSmall};
    `;
  },

  sizeMediumWithIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftMedium};
    `;
  },

  sizeLargeWithIcon(t: Theme) {
    return css`
      padding-left: ${t.btnWithIconPaddingLeftLarge};
    `;
  },

  sizeSmallWithIconWithoutText(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingLeftSmall};
    `;
  },

  sizeMediumWithIconWithoutText(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingLeftMedium};
    `;
  },

  sizeLargeWithIconWithoutText(t: Theme) {
    return css`
      padding-right: ${t.btnWithIconPaddingLeftLarge};
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
    return css`
      line-height: inherit !important; // override size mixin
    `;
  },

  linkLineHeightSafariFallback() {
    return css`
      /* Safari overrides 'underline' and 'border' if 'line-height' is used */
      margin: -1px 0 -2px;
    `;
  },

  linkFocus(t: Theme) {
    return css`
      & {
        color: ${t.btnLinkColor};
        text-decoration: ${t.btnLinkHoverTextDecoration};
      }
    `;
  },

  linkDisabled(t: Theme) {
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
    return css`
      position: relative;
      z-index: 2;

      &,
      &:hover:enabled,
      &:active:enabled,
      &:active:hover:enabled {
        box-shadow:
          inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
          0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus} !important; // override root:hover style
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
    `;
  },

  disabledWithoutOutline(t: Theme) {
    return css`
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDisabledBg};
    `;
  },

  arrowIconRoot() {
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
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftSmall} 0 ${t.btnWithIconPaddingLeftSmall};
      width: ${t.btnIconSizeSmall};
    `;
  },

  arrowIconRootMedium(t: Theme) {
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftMedium} 0 ${t.btnWithIconPaddingLeftMedium};
      width: ${t.btnIconSizeMedium};
    `;
  },

  arrowIconRootLarge(t: Theme) {
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftLarge} 0 ${t.btnWithIconPaddingLeftLarge};
      width: ${t.btnIconSizeLarge};
    `;
  },

  arrowIconLeft() {
    return css`
      left: 0;
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
        t.btnBorderWidth,
      )};

      &:hover {
        ${buttonHoverMixin(
          t.btnDefaultHoverBg,
          t.btnDefaultHoverBgStart,
          t.btnDefaultHoverBgEnd,
          t.btnDefaultHoverTextColor,
          t.btnDefaultHoverBorderColor,
          t.btnBorderWidth,
        )};
      }

      &:active {
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
        t.btnBorderWidth,
      )};

      &:hover {
        ${buttonHoverMixin(
          t.btnPrimaryHoverBg,
          t.btnPrimaryHoverBgStart,
          t.btnPrimaryHoverBgEnd,
          t.btnPrimaryHoverTextColor,
          t.btnPrimaryHoverBorderColor,
          t.btnBorderWidth,
        )};
      }

      &:active {
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
        t.btnBorderWidth,
      )};

      &:hover {
        ${buttonHoverMixin(
          t.btnSuccessHoverBg,
          t.btnSuccessHoverBgStart,
          t.btnSuccessHoverBgEnd,
          t.btnSuccessHoverTextColor,
          t.btnSuccessHoverBorderColor,
          t.btnBorderWidth,
        )};
      }

      &:active {
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
        t.btnBorderWidth,
      )};

      &:hover {
        ${buttonHoverMixin(
          t.btnDangerHoverBg,
          t.btnDangerHoverBgStart,
          t.btnDangerHoverBgEnd,
          t.btnDangerHoverTextColor,
          t.btnDangerHoverBorderColor,
          t.btnBorderWidth,
        )};
      }

      &:active {
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
        t.btnBorderWidth,
      )};

      &:hover {
        ${buttonHoverMixin(
          t.btnPayHoverBg,
          t.btnPayHoverBgStart,
          t.btnPayHoverBgEnd,
          t.btnPayHoverTextColor,
          t.btnPayHoverBorderColor,
          t.btnBorderWidth,
        )};
      }

      &:active {
        ${activeStyles.pay(t)}
      }
    `;
  },

  text(t: Theme) {
    return css`
      &,
      &:enabled,
      &:hover {
        box-shadow: none;
      }

      ${buttonUseMixin(t.btnTextBg, '', '', t.btnTextTextColor, t.btnTextBorderColor, t.btnBorderWidth)};

      &:hover {
        ${buttonHoverMixin(
          t.btnTextHoverBg,
          '',
          '',
          t.btnTextHoverTextColor,
          t.btnTextHoverBorderColor,
          t.btnBorderWidth,
        )};
      }

      &:active {
        ${activeStyles.text(t)}
      }
    `;
  },

  backless(t: Theme) {
    return css`
      ${buttonUseMixin(t.btnBacklessBg, '', '', t.btnBacklessTextColor, t.btnBacklessBorderColor, t.btnBorderWidth)};

      color: ${t.btnDefaultTextColor};
      background: transparent;

      &:hover {
        ${buttonHoverMixin(
          t.btnBacklessHoverBg,
          '',
          '',
          t.btnBacklessHoverTextColor,
          t.btnBacklessHoverBorderColor,
          t.btnBorderWidth,
        )};
      }

      &:active {
        ${activeStyles.backless(t)}
      }
    `;
  },

  checked(t: Theme) {
    const checkedStyles = `
      background-image: none;
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDefaultCheckedBorderColor} !important;
      background-color: ${t.btnCheckedBg} !important;
      color: ${t.btnCheckedTextColor} !important;

      .${globalClasses.innerShadow} {
        box-shadow: ${t.btnCheckedShadow};
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
    return css`
      &:hover:enabled,
      &:hover:active:enabled {
        box-shadow:
          inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
          0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus} !important;
        border-color: ${t.btnBorderColorFocus} !important;
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

      svg {
        color: ${t.btnCheckedDisabledColor} !important;
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

  wrapLink() {
    return css`
      padding: 0;
    `;
  },

  borderless() {
    return css`
      &,
      &:active:hover,
      &:hover {
        box-shadow: none !important; // override root:hover style
      }
    `;
  },

  backlessDisabled(t: Theme) {
    return css`
      box-shadow: 0 0 0 1px ${t.btnBacklessDisabledBorderColor};
      background-color: transparent;
    `;
  },

  textDisabled() {
    return css`
      background-color: transparent;
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
          t.btnBorderWidth,
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
          t.btnBorderWidth,
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
          t.btnBorderWidth,
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
          t.btnBorderWidth,
        )};
      }
    `;
  },

  pay(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin(t.btnPayActiveBg, t.btnPayActiveShadow, t.btnPayActiveBorderColor, t.btnBorderWidth)};
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
        ${buttonActiveMixin(t.btnTextActiveBg, '', t.btnTextActiveBg, t.btnBorderWidth)};
      }
    `;
  },

  backless(t: Theme) {
    return css`
      & {
        ${buttonActiveMixin(t.btnBacklessActiveBg, '', t.btnBacklessActiveBorderColor, t.btnBorderWidth)}
      }
    `;
  },
});
