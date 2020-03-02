import { css, cssName, keyframes } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';

import {
  buttonUseMixin,
  buttonHoverMixin,
  buttonActiveMixin,
  buttonSizeMixin,
  buttonArrowMixin,
  buttonLoadingArrowMixin,
} from './Button.mixins';

const btn_loading_arrow = keyframes`
0% {
  transform: translateX(50px) rotate(-44.3deg);
}

100% {
  transform: translateX(21px) translateY(30px) rotate(-44.3deg);
}
`;

export const jsStyles = {
  root(t: Theme) {
    return css`
      ${resetButton()};
      ${resetText()};

      background-clip: border-box;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      color: ${t.textColorDefault};
      cursor: pointer;
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
      &:not(${cssName(jsStyles.sizeSmall(t))}) {
        border-radius: ${t.btnBorderRadius};
      }
      ${cssName(jsStyles.link(t))}& {
        padding: 0;
      }
      &:active:not(${cssName(jsStyles.link(t))}):not(${cssName(jsStyles.disabled(t))}) {
        ${cssName(jsStyles.caption(t))} {
          transform: translateY(1px) !important;
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
      box-shadow: 0 0 0 2px ${t.borderColorWarning};
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
      box-shadow: 0 0 0 2px ${t.borderColorError};
    `;
  },

  sizeSmall(t: Theme) {
    return css`
      border-radius: ${t.btnSmallBorderRadius};

      ${buttonSizeMixin(
        t.btnFontSizeSmall,
        t.controlHeightSmall,
        t.btnHeightShift,
        t.controlLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        cssName(jsStyles.link(t)),
        cssName(jsStyles.fallback(t)),
      )};

      ${cssName(jsStyles.arrow())} {
        border-radius: ${t.btnSmallArrowBorderRadius};
      }

      ${buttonArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowLeft,
        t.btnSmallArrowRight,
        t.btnSmallArrowLength,
        'rotate(53deg) skewX(24deg) skewY(10deg)',
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  sizeMedium(t: Theme) {
    return css`
      ${buttonSizeMixin(
        t.btnFontSizeMedium,
        t.controlHeightMedium,
        t.btnHeightShift,
        t.controlLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        cssName(jsStyles.link(t)),
        cssName(jsStyles.fallback(t)),
      )};

      ${buttonArrowMixin(
        '9px',
        t.btnMediumArrowLeft,
        t.btnMediumArrowRight,
        '20.2px',
        t.btnMediumArrowTransform,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  sizeLarge(t: Theme) {
    return css`
      ${buttonSizeMixin(
        t.btnFontSizeLarge,
        t.controlHeightLarge,
        t.btnHeightShift,
        t.controlLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        cssName(jsStyles.link(t)),
        cssName(jsStyles.fallback(t)),
      )};

      ${buttonArrowMixin(
        '10.2px',
        t.btnLargeArrowLeft,
        '-10.8px',
        '22.2px',
        t.btnLargeArrowTransform,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  sizeSmallLoading(t: Theme) {
    return css`
      ${buttonLoadingArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowTop,
        '-207px',
        '441%',
        t.btnSmallArrowBg,
        t.btnSmallArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  sizeMediumLoading(t: Theme) {
    return css`
      ${buttonLoadingArrowMixin(
        '0',
        '0',
        t.btnMediumArrowLeftLoadingLeft,
        '441%',
        t.btnMediumArrowBg,
        t.btnMediumArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  sizeLargeLoading(t: Theme) {
    return css`
      ${buttonLoadingArrowMixin(
        '-32px',
        '-36px',
        ' -198px',
        '700%',
        t.btnLargeArrowBg,
        t.btnLargeArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  link(t: Theme) {
    return css`
      background: none;
      border-radius: ${t.btnLinkBorderRadius} !important;
      border: none;
      box-shadow: none;
      color: ${t.linkColor} !important;
      display: inline;
      line-height: inherit !important;
      margin: 0;
      padding: 0;

      &:hover {
        color: ${t.linkHoverColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkActiveColor} !important;
      }
      ${cssName(jsStyles.caption(t))} {
        display: inline;
      }
      ${cssName(jsStyles.icon())} {
        padding-right: ${t.linkIconMarginRight};
      }
      ${cssName(jsStyles.warning(t))} ,
      ${cssName(jsStyles.error(t))}  {
        box-shadow: none;
        left: -2px !important;
        right: -2px !important;
        bottom: -2px !important;
      }
      ${cssName(jsStyles.error(t))}  {
        background: ${t.errorSecondary} !important;
      }
    `;
  },

  focus(t: Theme) {
    return css`
      position: relative;
      z-index: 2;

      &${cssName(jsStyles.link(t))} {
        color: ${t.linkColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }

      &:not(${cssName(jsStyles.disabled(t))}):not(${cssName(jsStyles.link(t))}) {
        border: ${t.btnFocusBorder};

        &,
        &:hover,
        &:active,
        ${cssName(jsStyles.active(t))} {
          box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus};

          &${cssName(jsStyles.warning(t))}, &${cssName(jsStyles.error(t))} {
            box-shadow: inset 0 0 0 1px ${t.outlineColorFocus} !important;
            border-color: transparent !important;
          }
          ${cssName(jsStyles.arrow())} {
            box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};

            &${cssName(jsStyles.arrowWarning(t))} {
              box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning} !important;
            }

            &${cssName(jsStyles.arrowError(t))} {
              box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorError} !important;
            }
          }
        }
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      cursor: default;
      pointer-events: none;
      border-color: transparent !important;

      &:not(${cssName(jsStyles.link(t))}) {
        background: ${t.btnDisabledBg} !important;
        color: ${t.btnDisabledTextColor} !important;
        box-shadow: ${t.btnDisabledShadow} !important;

        ${cssName(jsStyles.arrow())} {
          background: ${t.btnDisabledBg} !important;
          box-shadow: ${t.btnDisabledShadowArrow} !important;
        }
      }

      &${cssName(jsStyles.link(t))} {
        color: ${t.linkDisabledColor} !important;
      }
    `;
  },

  fallback(t: Theme) {
    return css`
      &${cssName(jsStyles.disabled(t))} {
        outline-color: transparent;
      }
      &:not(${cssName(jsStyles.link(t))}) {
        line-height: normal !important;
      }
    `;
  },

  validationRoot(t: Theme) {
    return css`
      ${cssName(jsStyles.focus(t))} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
        border-color: transparent !important;
      }
    `;
  },

  arrowWarning(t: Theme) {
    return css`
      box-shadow: 2px -2px 0 0 ${t.borderColorWarning} !important;
    `;
  },

  arrowError(t: Theme) {
    return css`
      box-shadow: 2px -2px 0 0 ${t.borderColorError} !important;
    `;
  },

  arrowLeft(t: Theme) {
    return css`
      visibility: visible;

      ${cssName(jsStyles.checked(t))}:not(${cssName(jsStyles.focus(t))}) & {
        box-shadow: ${t.btnCheckedShadowArrowLeft};
      }
    `;
  },

  default(t: Theme) {
    return css`
      ${buttonUseMixin(
        t.btnDefaultBg,
        t.btnDefaultBgStart,
        t.btnDefaultBgEnd,
        t.btnDefaultBgArrowStart,
        t.btnDefaultBgArrowEnd,
        t.btnDefaultShadow,
        t.btnDefaultShadowArrow,
        t.btnDefaultShadowArrowLeft,
        t.btnDefaultTextColor,
        t.btnDefaultBorder,
        cssName(jsStyles.checked(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonHoverMixin(
        t.btnDefaultHoverBg,
        t.btnDefaultHoverBgStart,
        t.btnDefaultHoverBgEnd,
        t.btnDefaultHoverBgStart,
        t.btnDefaultHoverBgEnd,
        t.btnDefaultHoverShadow,
        t.btnDefaultHoverShadowArrow,
        t.btnDefaultHoverShadowArrowLeft,
        t.btnDefaultHoverBorder,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveShadow,
        t.btnDefaultActiveShadowArrow,
        t.btnDefaultActiveShadowArrowLeft,
        cssName(jsStyles.active(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      &${cssName(jsStyles.checked(t))} {
        &,
        &:not(${cssName(jsStyles.focus(t))}):hover {
          ${cssName(jsStyles.arrow())} {
            box-shadow: ${t.btnDefaultCheckedShadowArrow};
          }
        }
      }
    `;
  },

  primary(t: Theme) {
    return css`
      ${buttonUseMixin(
        t.btnPrimaryBg,
        t.btnPrimaryBgStart,
        t.btnPrimaryBgEnd,
        t.btnPrimaryBgArrowStart,
        t.btnPrimaryBgArrowEnd,
        t.btnPrimaryShadow,
        t.btnPrimaryShadowArrow,
        t.btnPrimaryShadowArrowLeft,
        t.btnPrimaryTextColor,
        t.btnPrimaryBorder,
        cssName(jsStyles.checked(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonHoverMixin(
        t.btnPrimaryHoverBg,
        t.btnPrimaryHoverBgStart,
        t.btnPrimaryHoverBgEnd,
        t.btnPrimaryHoverBgStart,
        t.btnPrimaryHoverBgEnd,
        t.btnPrimaryHoverShadow,
        t.btnPrimaryHoverShadowArrow,
        t.btnPrimaryHoverShadowArrowLeft,
        t.btnPrimaryHoverBorder,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveShadow,
        t.btnPrimaryActiveShadowArrow,
        t.btnPrimaryActiveShadowArrowLeft,
        cssName(jsStyles.active(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  success(t: Theme) {
    return css`
      ${buttonUseMixin(
        t.btnSuccessBg,
        t.btnSuccessBgStart,
        t.btnSuccessBgEnd,
        t.btnSuccessBgArrowStart,
        t.btnSuccessBgArrowEnd,
        t.btnSuccessShadow,
        t.btnSuccessShadowArrow,
        t.btnSuccessShadowArrowLeft,
        t.btnSuccessTextColor,
        t.btnSuccessBorder,
        cssName(jsStyles.checked(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonHoverMixin(
        t.btnSuccessHoverBg,
        t.btnSuccessHoverBgStart,
        t.btnSuccessHoverBgEnd,
        t.btnSuccessHoverBgStart,
        t.btnSuccessHoverBgEnd,
        t.btnSuccessHoverShadow,
        t.btnSuccessHoverShadowArrow,
        t.btnSuccessHoverShadowArrowLeft,
        t.btnSuccessHoverBorder,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveShadow,
        t.btnSuccessActiveShadowArrow,
        t.btnSuccessActiveShadowArrowLeft,
        cssName(jsStyles.active(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  danger(t: Theme) {
    return css`
      ${buttonUseMixin(
        t.btnDangerBg,
        t.btnDangerBgStart,
        t.btnDangerBgEnd,
        t.btnDangerBgArrowStart,
        t.btnDangerBgArrowEnd,
        t.btnDangerShadow,
        t.btnDangerShadowArrow,
        t.btnDangerShadowArrowLeft,
        t.btnDangerTextColor,
        t.btnDangerBorder,
        cssName(jsStyles.checked(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonHoverMixin(
        t.btnDangerHoverBg,
        t.btnDangerHoverBgStart,
        t.btnDangerHoverBgEnd,
        t.btnDangerHoverBgStart,
        t.btnDangerHoverBgEnd,
        t.btnDangerHoverShadow,
        t.btnDangerHoverShadowArrow,
        t.btnDangerHoverShadowArrowLeft,
        t.btnDangerHoverBorder,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveShadow,
        t.btnDangerActiveShadowArrow,
        t.btnDangerActiveShadowArrowLeft,
        cssName(jsStyles.active(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  pay(t: Theme) {
    return css`
      ${buttonUseMixin(
        t.btnPayBg,
        t.btnPayBgStart,
        t.btnPayBgEnd,
        t.btnPayBgArrowStart,
        t.btnPayBgArrowEnd,
        t.btnPayShadow,
        t.btnPayShadowArrow,
        t.btnPayShadowArrowLeft,
        t.btnPayTextColor,
        t.btnPayBorder,
        cssName(jsStyles.checked(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonHoverMixin(
        t.btnPayHoverBg,
        t.btnPayHoverBgStart,
        t.btnPayHoverBgEnd,
        t.btnPayHoverBgStart,
        t.btnPayHoverBgEnd,
        t.btnPayHoverShadow,
        t.btnPayHoverShadowArrow,
        t.btnPayHoverShadowArrowLeft,
        t.btnPayHoverBorder,
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveShadow,
        t.btnPayActiveShadowArrow,
        t.btnPayActiveShadowArrowLeft,
        cssName(jsStyles.active(t)),
        cssName(jsStyles.arrow()),
        cssName(jsStyles.arrowLeft(t)),
      )};
    `;
  },

  checked(t: Theme) {
    return css`
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), inset 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;

      &,
      &:not(${cssName(jsStyles.focus(t))}):hover {
        background: ${t.btnCheckedBg} !important;
        box-shadow: ${t.btnCheckedShadow} !important;
        color: ${t.btnCheckedTextColor} !important;
      }

      &:not(${cssName(jsStyles.link(t))}):not(${cssName(jsStyles.disabled(t))}) {
        ${cssName(jsStyles.caption(t))} {
          transform: translateY(1px) !important;
        }
      }

      &,
      &:not(${cssName(jsStyles.focus(t))}):hover {
        ${cssName(jsStyles.arrow())} {
          background: ${t.btnCheckedBg} !important;
          box-shadow: ${t.btnCheckedShadowArrow};
        }
      }

      &,
      &:not(${cssName(jsStyles.focus(t))}):hover {
        border-color: ${t.btnCheckedHoverBorderColor};
      }
    `;
  },

  active(t: Theme) {
    return css`
      &:not(${cssName(jsStyles.link(t))}):not(${cssName(jsStyles.disabled(t))}) {
        ${cssName(jsStyles.caption(t))} {
          transform: translateY(1px) !important;
        }
      }
    `;
  },

  caption(t: Theme) {
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

  wrapLink(t: Theme) {
    return css`
      ${jsStyles.wrap(t)};

      padding: 0;
    `;
  },

  wrapArrow(t: Theme) {
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

  arrow() {
    return css`
      position: absolute;
      border-radius: 2px 2px 2px 16px;
      box-sizing: border-box;
      z-index: 1;
    `;
  },

  icon() {
    return css`
      display: inline-block;
      padding-right: 7px;
    `;
  },

  buttonWithIcon() {
    return css`
      padding-right: 15px;
      padding-left: 15px;
    `;
  },

  borderless(t: Theme) {
    const focus = cssName(jsStyles.focus(t));
    const disabled = cssName(jsStyles.disabled(t));
    const checked = cssName(jsStyles.checked(t));
    const active = cssName(jsStyles.active(t));

    return css`
      &:not(${focus}):not(${disabled}):not(${active}):not(${checked}) {
        &,
        &:hover,
        &:active {
          box-shadow: none !important;
        }
      }
    `;
  },

  loading() {
    const btn_loading = keyframes`
    0% {
      transform: translateX(0) rotateY(180deg);
    }

    100% {
      transform: translateX(-30px) rotateY(180deg);
    }
  `;
    return css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: inherit;
      overflow: hidden;

      &::before {
        content: '';
        height: 100%;
        position: absolute;
        opacity: 0.2;
        background: linear-gradient(-110deg, #ccc 30%, transparent 0, transparent 60%, #ccc 0);
        background-size: 30px 100%;
        top: 0;
        left: 0;
        right: -30px;
        animation: ${btn_loading} 1s linear infinite;
        transform: rotateY(180deg);
      }
    `;
  },
};
