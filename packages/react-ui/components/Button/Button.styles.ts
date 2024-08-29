import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';
import { isFirefox } from '../../lib/client';

import {
  arrowOutlineMixin,
  buttonActiveMixin,
  buttonHoverMixin,
  buttonSizeMixin,
  buttonSizeMixinIE11,
  buttonUseMixin,
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
});

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
      ${resetButton(emotion)};
      ${resetText(emotion)};

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
      return emotion.css`
      padding-right: calc(${t.btnIconSizeSmall} + ${t.btnWithIconPaddingLeftSmall} + ${t.btnWithIconPaddingLeftSmall});
    `;
    },

    withArrowIconRightMedium(t: Theme) {
      return emotion.css`
      padding-right: calc(
        ${t.btnIconSizeMedium} + ${t.btnWithIconPaddingLeftMedium} + ${t.btnWithIconPaddingLeftMedium}
      );
    `;
    },

    withArrowIconRightLarge(t: Theme) {
      return emotion.css`
      padding-right: calc(${t.btnIconSizeLarge} + ${t.btnWithIconPaddingLeftLarge} + ${t.btnWithIconPaddingLeftLarge});
    `;
    },

    withArrowIconLeftSmall(t: Theme) {
      return emotion.css`
      padding-left: calc(${t.btnIconSizeSmall} + ${t.btnWithIconPaddingLeftSmall} + ${t.btnWithIconPaddingLeftSmall});
    `;
    },

    withArrowIconLeftMedium(t: Theme) {
      return emotion.css`
      padding-left: calc(
        ${t.btnIconSizeMedium} + ${t.btnWithIconPaddingLeftMedium} + ${t.btnWithIconPaddingLeftMedium}
      );
    `;
    },

    withArrowIconLeftLarge(t: Theme) {
      return emotion.css`
      padding-left: calc(${t.btnIconSizeLarge} + ${t.btnWithIconPaddingLeftLarge} + ${t.btnWithIconPaddingLeftLarge});
    `;
    },

    simulatedPress() {
      return emotion.css`
      &:active .${globalClasses.caption} {
        transform: translateY(1px);
      }
    `;
    },

    outline() {
      return emotion.css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `;
    },

    outlineWarning(t: Theme) {
      return emotion.css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning},
        inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
    },

    outlineError(t: Theme) {
      return emotion.css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError}, inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
    },

    outlineLink() {
      return emotion.css`
      box-shadow: none;
      left: -2px;
      right: -2px;
      bottom: -2px;
      top: -2px;
    `;
    },

    outlineLinkWarning(t: Theme) {
      return emotion.css`
      background-color: ${t.btnWarningSecondary};
    `;
    },

    outlineLinkError(t: Theme) {
      return emotion.css`
      background-color: ${t.btnErrorSecondary};
    `;
    },

    sizeSmall(t: Theme) {
      return emotion.css`
      border-radius: ${t.btnBorderRadiusSmall};

      ${buttonSizeMixin(emotion)(
        t.btnFontSizeSmall,
        t.btnLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        t.fontFamilyCompensationBaseline,
      )};
    `;
    },

    sizeSmallIE11(t: Theme) {
      return emotion.css`
      ${buttonSizeMixinIE11(emotion)(
        t.btnFontSizeSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        t.fontFamilyCompensationBaseline,
      )};
    `;
    },

    sizeMedium(t: Theme) {
      return emotion.css`
      border-radius: ${t.btnBorderRadiusMedium};

      ${buttonSizeMixin(emotion)(
        t.btnFontSizeMedium,
        t.btnLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        t.fontFamilyCompensationBaseline,
      )};
    `;
    },

    sizeMediumIE11(t: Theme) {
      return emotion.css`
      ${buttonSizeMixinIE11(emotion)(
        t.btnFontSizeMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        t.fontFamilyCompensationBaseline,
      )};
    `;
    },

    sizeLarge(t: Theme) {
      return emotion.css`
      border-radius: ${t.btnBorderRadiusLarge};

      ${buttonSizeMixin(emotion)(
        t.btnFontSizeLarge,
        t.btnLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        t.fontFamilyCompensationBaseline,
      )};
    `;
    },

    sizeLargeIE11(t: Theme) {
      return emotion.css`
      ${buttonSizeMixinIE11(emotion)(
        t.btnFontSizeLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        t.fontFamilyCompensationBaseline,
      )};
    `;
    },

    sizeSmallWithIcon(t: Theme) {
      return emotion.css`
      padding-left: ${t.btnWithIconPaddingLeftSmall};
    `;
    },

    sizeMediumWithIcon(t: Theme) {
      return emotion.css`
      padding-left: ${t.btnWithIconPaddingLeftMedium};
    `;
    },

    sizeLargeWithIcon(t: Theme) {
      return emotion.css`
      padding-left: ${t.btnWithIconPaddingLeftLarge};
    `;
    },

    sizeSmallWithIconWithoutText(t: Theme) {
      return emotion.css`
      padding-right: ${t.btnWithIconPaddingLeftSmall};
    `;
    },

    sizeMediumWithIconWithoutText(t: Theme) {
      return emotion.css`
      padding-right: ${t.btnWithIconPaddingLeftMedium};
    `;
    },

    sizeLargeWithIconWithoutText(t: Theme) {
      return emotion.css`
      padding-right: ${t.btnWithIconPaddingLeftLarge};
    `;
    },

    link(t: Theme) {
      return emotion.css`
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
        ${getActiveStyles(emotion).link(t)}
      }
    `;
    },

    linkLineHeight() {
      return emotion.css`
      line-height: inherit !important; // override size mixin
    `;
    },

    linkLineHeightSafariFallback() {
      return emotion.css`
      /* Safari overrides 'underline' and 'border' if 'line-height' is used */
      margin: -1px 0 -2px;
    `;
    },

    linkFocus(t: Theme) {
      return emotion.css`
      & {
        color: ${t.btnLinkColor};
        text-decoration: ${t.btnLinkHoverTextDecoration};
      }
    `;
    },

    linkDisabled(t: Theme) {
      return emotion.css`
      cursor: default;

      &,
      &:hover:enabled,
      &:active:enabled {
        color: ${t.btnLinkDisabledColor};
      }
    `;
    },

    focus(t: Theme) {
      return emotion.css`
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
      return emotion.css`
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
      return emotion.css`
      box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDisabledBg};
    `;
    },

    arrowWarning(t: Theme) {
      return emotion.css`
      box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};

      ${arrowOutlineMixin(emotion)(t.btnInsetWidth, t.btnBorderColorWarning, t.btnOutlineWidth, t.btnInsetColor)}
    `;
    },

    arrowError(t: Theme) {
      return emotion.css`
      box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};

      ${arrowOutlineMixin(emotion)(t.btnInsetWidth, t.btnBorderColorError, t.btnOutlineWidth, t.btnInsetColor)}
    `;
    },

    arrowFocus(t: Theme) {
      return emotion.css`
      box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus};

      ${arrowOutlineMixin(emotion)(t.btnInsetWidth, t.btnBorderColorFocus, t.btnOutlineWidth, t.btnOutlineColorFocus)}
    `;
    },

    arrow() {
      return emotion.css`
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
      return emotion.css`
      transform: scaleX(-1);
    `;
    },

    arrowIconRoot() {
      return emotion.css`
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
      return emotion.css`
      padding: 0 ${t.btnWithIconPaddingLeftSmall} 0 ${t.btnWithIconPaddingLeftSmall};
      width: ${t.btnIconSizeSmall};
    `;
    },

    arrowIconRootMedium(t: Theme) {
      return emotion.css`
      padding: 0 ${t.btnWithIconPaddingLeftMedium} 0 ${t.btnWithIconPaddingLeftMedium};
      width: ${t.btnIconSizeMedium};
    `;
    },

    arrowIconRootLarge(t: Theme) {
      return emotion.css`
      padding: 0 ${t.btnWithIconPaddingLeftLarge} 0 ${t.btnWithIconPaddingLeftLarge};
      width: ${t.btnIconSizeLarge};
    `;
    },

    arrowIconLeft() {
      return emotion.css`
      left: 0;
    `;
    },

    default(t: Theme) {
      return emotion.css`
      ${buttonUseMixin(emotion)(
        t.btnDefaultBg,
        t.btnDefaultBgStart,
        t.btnDefaultBgEnd,
        t.btnDefaultTextColor,
        t.btnDefaultBorderColor,
        t.btnDefaultBorderBottomColor,
        t.btnBorderWidth,
      )};

      &:hover:enabled {
        ${buttonHoverMixin(emotion)(
          t.btnDefaultHoverBg,
          t.btnDefaultHoverBgStart,
          t.btnDefaultHoverBgEnd,
          t.btnDefaultHoverTextColor,
          t.btnDefaultHoverBorderColor,
          t.btnDefaultHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      &:active:enabled {
        ${getActiveStyles(emotion).default(t)};
      }
    `;
    },

    primary(t: Theme) {
      return emotion.css`
      ${buttonUseMixin(emotion)(
        t.btnPrimaryBg,
        t.btnPrimaryBgStart,
        t.btnPrimaryBgEnd,
        t.btnPrimaryTextColor,
        t.btnPrimaryBorderColor,
        t.btnPrimaryBorderBottomColor,
        t.btnBorderWidth,
      )};

      &:hover:enabled {
        ${buttonHoverMixin(emotion)(
          t.btnPrimaryHoverBg,
          t.btnPrimaryHoverBgStart,
          t.btnPrimaryHoverBgEnd,
          t.btnPrimaryHoverTextColor,
          t.btnPrimaryHoverBorderColor,
          t.btnPrimaryHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      &:active:enabled {
        ${getActiveStyles(emotion).primary(t)}
      }
    `;
    },

    success(t: Theme) {
      return emotion.css`
      ${buttonUseMixin(emotion)(
        t.btnSuccessBg,
        t.btnSuccessBgStart,
        t.btnSuccessBgEnd,
        t.btnSuccessTextColor,
        t.btnSuccessBorderColor,
        t.btnSuccessBorderBottomColor,
        t.btnBorderWidth,
      )};

      &:hover:enabled {
        ${buttonHoverMixin(emotion)(
          t.btnSuccessHoverBg,
          t.btnSuccessHoverBgStart,
          t.btnSuccessHoverBgEnd,
          t.btnSuccessHoverTextColor,
          t.btnSuccessHoverBorderColor,
          t.btnSuccessHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      &:active:enabled {
        ${getActiveStyles(emotion).success(t)}
      }
    `;
    },

    danger(t: Theme) {
      return emotion.css`
      ${buttonUseMixin(emotion)(
        t.btnDangerBg,
        t.btnDangerBgStart,
        t.btnDangerBgEnd,
        t.btnDangerTextColor,
        t.btnDangerBorderColor,
        t.btnDangerBorderBottomColor,
        t.btnBorderWidth,
      )};

      &:hover:enabled {
        ${buttonHoverMixin(emotion)(
          t.btnDangerHoverBg,
          t.btnDangerHoverBgStart,
          t.btnDangerHoverBgEnd,
          t.btnDangerHoverTextColor,
          t.btnDangerHoverBorderColor,
          t.btnDangerHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      &:active:enabled {
        ${getActiveStyles(emotion).danger(t)}
      }
    `;
    },

    pay(t: Theme) {
      return emotion.css`
      ${buttonUseMixin(emotion)(
        t.btnPayBg,
        t.btnPayBgStart,
        t.btnPayBgEnd,
        t.btnPayTextColor,
        t.btnPayBorderColor,
        t.btnPayBorderBottomColor,
        t.btnBorderWidth,
      )};

      &:hover:enabled {
        ${buttonHoverMixin(emotion)(
          t.btnPayHoverBg,
          t.btnPayHoverBgStart,
          t.btnPayHoverBgEnd,
          t.btnPayHoverTextColor,
          t.btnPayHoverBorderColor,
          t.btnPayHoverBorderBottomColor,
          t.btnBorderWidth,
        )};
      }

      &:active:enabled {
        ${getActiveStyles(emotion).pay(t)}
      }
    `;
    },

    text(t: Theme) {
      return emotion.css`
      &,
      &:enabled,
      &:hover:enabled {
        box-shadow: none;
        .${globalClasses.arrowHelperTop}, .${globalClasses.arrowHelperBottom} {
          box-shadow: none !important;
        }
      }

      ${buttonUseMixin(emotion)(t.btnTextBg, '', '', t.btnTextTextColor, t.btnTextBorderColor, '', t.btnBorderWidth)};

      &:hover:enabled {
        ${buttonHoverMixin(emotion)(
          t.btnTextHoverBg,
          '',
          '',
          t.btnTextHoverTextColor,
          t.btnTextHoverBorderColor,
          '',
          t.btnBorderWidth,
        )};
      }

      &:active:enabled {
        ${getActiveStyles(emotion).text(t)}
      }
    `;
    },

    backless(t: Theme) {
      return emotion.css`
      ${buttonUseMixin(emotion)(
        t.btnBacklessBg,
        '',
        '',
        t.btnBacklessTextColor,
        t.btnBacklessBorderColor,
        '',
        t.btnBorderWidth,
      )};

      color: ${t.btnDefaultTextColor};
      background: transparent;

      &:hover:enabled {
        ${buttonHoverMixin(emotion)(
          t.btnBacklessHoverBg,
          '',
          '',
          t.btnBacklessHoverTextColor,
          t.btnBacklessHoverBorderColor,
          '',
          t.btnBorderWidth,
        )};
      }

      &:active:enabled {
        ${getActiveStyles(emotion).backless(t)}
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

      return emotion.css`
      ${checkedStyles}

      &:hover:enabled,
      &:active:enabled,
      &:hover:active:enabled {
        ${checkedStyles}
      }
    `;
    },

    checked2022(t: Theme) {
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

      return emotion.css`
      ${checkedStyles}

      &:hover:enabled,
      &:active:enabled,
      &:hover:active:enabled {
        ${checkedStyles}
      }
    `;
    },

    checkedFocused(t: Theme) {
      return emotion.css`
      &:hover:enabled,
      &:hover:active:enabled {
        box-shadow: inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
          0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus} !important;
        border-color: ${t.btnBorderColorFocus} !important;
      }
    `;
    },

    checkedDisabled(t: Theme) {
      return emotion.css`
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
      return emotion.css`
      svg {
        color: ${t.btnCheckedDisabledColor} !important;
      }
    `;
    },

    caption() {
      return emotion.css`
      position: relative;
      white-space: nowrap;
      display: inline-block;
      width: 100%;
      vertical-align: top;
    `;
    },

    captionLink() {
      return emotion.css`
      display: inline;
      transform: none !important; // override root:active style
    `;
    },

    captionTranslated() {
      return emotion.css`
      transform: translateY(1px);
    `;
    },

    captionDisabled() {
      return emotion.css`
      transform: none !important; // override root:active style
    `;
    },

    wrap(t: Theme) {
      return emotion.css`
      box-sizing: border-box;
      display: inline-block;
      line-height: normal;
      padding: ${t.btnBorderWidth};
    `;
    },

    wrapSmall(t: Theme) {
      return emotion.css`
      height: ${t.btnHeightSmall};
    `;
    },

    wrapMedium(t: Theme) {
      return emotion.css`
      height: ${t.btnHeightMedium};
    `;
    },

    wrapLarge(t: Theme) {
      return emotion.css`
      height: ${t.btnHeightLarge};
    `;
    },

    narrow() {
      return emotion.css`
      padding-left: 5px;
      padding-right: 5px;
    `;
    },

    noPadding() {
      return emotion.css`
      padding-left: 0;
      padding-right: 0;
    `;
    },

    noRightPadding() {
      return emotion.css`
      padding-right: 0;
    `;
    },

    wrapLink() {
      return emotion.css`
      padding: 0;
    `;
    },

    wrapArrow() {
      return emotion.css`
      margin-right: 10px;
    `;
    },

    wrapArrowLeft() {
      return emotion.css`
      margin-right: 0;
      margin-left: 10px;
    `;
    },

    borderless() {
      return emotion.css`
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
      return emotion.css`
      &,
      &:active:hover,
      &:hover {
        box-shadow: none !important; // override root:hover style
      }
    `;
    },

    backlessDisabled2022(t: Theme) {
      return emotion.css`
      box-shadow: 0 0 0 1px ${t.btnBacklessDisabledBorderColor};
    `;
    },

    textDisabled2022() {
      return emotion.css`
      background-color: transparent;
    `;
    },

    loading() {
      return emotion.css`
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
      return emotion.css`
      visibility: hidden;
    `;
    },
  });

export const getActiveStyles = (emotion: Emotion) =>
  memoizeStyle({
    default(t: Theme) {
      return emotion.css`
      & {
        ${buttonActiveMixin(emotion)(
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
      return emotion.css`
      & {
        ${buttonActiveMixin(emotion)(
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
      return emotion.css`
      & {
        ${buttonActiveMixin(emotion)(
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
      return emotion.css`
      & {
        ${buttonActiveMixin(emotion)(
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
      return emotion.css`
      & {
        ${buttonActiveMixin(emotion)(
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
      return emotion.css`
      & {
        color: ${t.btnLinkActiveColor};
      }
    `;
    },

    text(t: Theme) {
      return emotion.css`
      & {
        ${buttonActiveMixin(emotion)(
          t.btnTextActiveBg,
          '',
          t.btnTextActiveBg,
          '',
          t.btnBorderWidth,
          t.btnArrowBgImageActive,
        )};
      }
    `;
    },

    backless(t: Theme) {
      return emotion.css`
      &,
      &:hover {
        background: ${t.btnBacklessActiveBg};
      }
    `;
    },
  });
