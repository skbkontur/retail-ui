import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
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
      return emotion.css`
        padding-right: calc(
          ${t.btnIconSizeSmall} + ${t.btnWithIconPaddingLeftSmall} + ${t.btnWithIconPaddingLeftSmall}
        );
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
        padding-right: calc(
          ${t.btnIconSizeLarge} + ${t.btnWithIconPaddingLeftLarge} + ${t.btnWithIconPaddingLeftLarge}
        );
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
        box-shadow:
          0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning},
          inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
      `;
    },

    outlineError(t: Theme) {
      return emotion.css`
        box-shadow:
          0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError},
          inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
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

        ${buttonSizeMixin(emotion)(t.btnFontSizeSmall, t.btnLineHeightSmall, t.btnPaddingXSmall, t.btnPaddingYSmall)};
      `;
    },

    sizeSmallIE11(t: Theme) {
      return emotion.css`
        ${buttonSizeMixinIE11(emotion)(t.btnPaddingXSmall, t.btnPaddingYSmall)};
      `;
    },

    sizeMedium(t: Theme) {
      return emotion.css`
        border-radius: ${t.btnBorderRadiusMedium};

        ${buttonSizeMixin(emotion)(t.btnFontSizeMedium, t.btnLineHeightMedium, t.btnPaddingXMedium, t.btnPaddingYMedium)};
      `;
    },

    sizeMediumIE11(t: Theme) {
      return emotion.css`
        ${buttonSizeMixinIE11(emotion)(t.btnPaddingXMedium, t.btnPaddingYMedium)};
      `;
    },

    sizeLarge(t: Theme) {
      return emotion.css`
        border-radius: ${t.btnBorderRadiusLarge};

        ${buttonSizeMixin(emotion)(t.btnFontSizeLarge, t.btnLineHeightLarge, t.btnPaddingXLarge, t.btnPaddingYLarge)};
      `;
    },

    sizeLargeIE11(t: Theme) {
      return emotion.css`
        ${buttonSizeMixinIE11(emotion)(t.btnPaddingXLarge, t.btnPaddingYLarge)};
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
          box-shadow:
            inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
            0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus} !important; // override root:hover style
        }
      `;
    },

    disabled(t: Theme) {
      return emotion.css`
        cursor: default;
        pointer-events: none;
        box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDisabledBorderColor};

        background-image: none;
        background-color: ${t.btnDisabledBg};
        color: ${t.btnDisabledTextColor};
      `;
    },

    disabledWithoutOutline(t: Theme) {
      return emotion.css`
        box-shadow: 0 0 0 ${t.btnBorderWidth} ${t.btnDisabledBg};
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
          t.btnBorderWidth,
        )};

        &:hover {
          ${buttonHoverMixin(emotion)(
            t.btnDefaultHoverBg,
            t.btnDefaultHoverBgStart,
            t.btnDefaultHoverBgEnd,
            t.btnDefaultHoverTextColor,
            t.btnDefaultHoverBorderColor,
            t.btnBorderWidth,
          )};
        }

        &:active {
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
          t.btnBorderWidth,
        )};

        &:hover {
          ${buttonHoverMixin(emotion)(
            t.btnPrimaryHoverBg,
            t.btnPrimaryHoverBgStart,
            t.btnPrimaryHoverBgEnd,
            t.btnPrimaryHoverTextColor,
            t.btnPrimaryHoverBorderColor,
            t.btnBorderWidth,
          )};
        }

        &:active {
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
          t.btnBorderWidth,
        )};

        &:hover {
          ${buttonHoverMixin(emotion)(
            t.btnSuccessHoverBg,
            t.btnSuccessHoverBgStart,
            t.btnSuccessHoverBgEnd,
            t.btnSuccessHoverTextColor,
            t.btnSuccessHoverBorderColor,
            t.btnBorderWidth,
          )};
        }

        &:active {
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
          t.btnBorderWidth,
        )};

        &:hover {
          ${buttonHoverMixin(emotion)(
            t.btnDangerHoverBg,
            t.btnDangerHoverBgStart,
            t.btnDangerHoverBgEnd,
            t.btnDangerHoverTextColor,
            t.btnDangerHoverBorderColor,
            t.btnBorderWidth,
          )};
        }

        &:active {
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
          t.btnBorderWidth,
        )};

        &:hover {
          ${buttonHoverMixin(emotion)(
            t.btnPayHoverBg,
            t.btnPayHoverBgStart,
            t.btnPayHoverBgEnd,
            t.btnPayHoverTextColor,
            t.btnPayHoverBorderColor,
            t.btnBorderWidth,
          )};
        }

        &:active {
          ${getActiveStyles(emotion).pay(t)}
        }
      `;
    },

    text(t: Theme) {
      return emotion.css`
        &,
        &:enabled,
        &:hover {
          box-shadow: none;
        }

        ${buttonUseMixin(emotion)(t.btnTextBg, '', '', t.btnTextTextColor, t.btnTextBorderColor, t.btnBorderWidth)};

        &:hover {
          ${buttonHoverMixin(emotion)(
            t.btnTextHoverBg,
            '',
            '',
            t.btnTextHoverTextColor,
            t.btnTextHoverBorderColor,
            t.btnBorderWidth,
          )};
        }

        &:active {
          ${getActiveStyles(emotion).text(t)}
        }
      `;
    },

    backless(t: Theme) {
      return emotion.css`
        ${buttonUseMixin(emotion)(t.btnBacklessBg, '', '', t.btnBacklessTextColor, t.btnBacklessBorderColor, t.btnBorderWidth)};

        color: ${t.btnDefaultTextColor};
        background: transparent;

        &:hover {
          ${buttonHoverMixin(emotion)(
            t.btnBacklessHoverBg,
            '',
            '',
            t.btnBacklessHoverTextColor,
            t.btnBacklessHoverBorderColor,
            t.btnBorderWidth,
          )};
        }

        &:active {
          ${getActiveStyles(emotion).backless(t)}
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
          box-shadow:
            inset 0 0 0 ${t.btnInsetWidth} ${t.btnOutlineColorFocus},
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

    borderless() {
      return emotion.css`
        &,
        &:active:hover,
        &:hover {
          box-shadow: none !important; // override root:hover style
        }
      `;
    },

    backlessDisabled(t: Theme) {
      return emotion.css`
        box-shadow: 0 0 0 1px ${t.btnBacklessDisabledBorderColor};
        background-color: transparent;
      `;
    },

    textDisabled() {
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
            t.btnBorderWidth,
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
            t.btnBorderWidth,
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
            t.btnBorderWidth,
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
            t.btnBorderWidth,
          )};
        }
      `;
    },

    pay(t: Theme) {
      return emotion.css`
        & {
          ${buttonActiveMixin(emotion)(t.btnPayActiveBg, t.btnPayActiveShadow, t.btnPayActiveBorderColor, t.btnBorderWidth)};
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
          ${buttonActiveMixin(emotion)(t.btnTextActiveBg, '', t.btnTextActiveBg, t.btnBorderWidth)};
        }
      `;
    },

    backless(t: Theme) {
      return emotion.css`
        & {
          ${buttonActiveMixin(emotion)(t.btnBacklessActiveBg, '', t.btnBacklessActiveBorderColor, t.btnBorderWidth)}
        }
      `;
    },
  });
