import { css, keyframes } from '../../lib/theming/Emotion';
import classes from './Button.module.less';
import { ITheme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';

import {
  buttonLinkMixin,
  buttonUseMixin,
  buttonArrowMixin,
  buttonLoadingArrowMixin,
  buttonHoverMixin,
  buttonActiveMixin,
  buttonSizeMixin,
} from './Button.mixins';

const jsClasses = {
  root(t: ITheme) {
    return css`
      ${resetButton()};
      ${resetText()};

      width: 100%;
      text-align: center;
      color: ${t.textColorDefault};
      border-radius: ${t.btnBorderRadius};

      cursor: pointer;
      display: inline-block;
      position: relative;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-clip: border-box;

      &::-moz-focus-inner {
        border: 0;
        padding: 0;
      }

      &:active,
      &.${classes.active}, &.${classes.checked} {
        &:not(.${classes.link}):not(.${classes.disabled}) {
          .${classes.caption} {
            transform: translateY(1px);
          }
        }
      }

      &::after {
        content: '';
        display: inline-block;
        vertical-align: baseline;
        width: 0;
      }

      &:not(.${classes.link}) {
        .rt-ie-any & {
          line-height: normal;
        }
      }

      .${classes.warning}, .${classes.error} {
        border-radius: inherit;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      .${classes.arrow} {
        position: absolute;
        border-radius: 2px 2px 2px 16px;
        box-sizing: border-box;
        z-index: 1;

        &.${classes.arrow_loading} {
          overflow: hidden;

          &::before {
            background: linear-gradient(-56deg, transparent 47.5%, #ccc 0, #ccc 73.5%, transparent 0);
            background-size: 41px 100%;
            content: '';
            display: block;
            position: absolute;
            opacity: 0.2;
            left: -207px;
            right: -72px;
            transform: rotate(-47deg) skewX(0deg) skewY(0deg);

            animation: ${loadingAnimationArrow} 1s linear infinite;
          }
        }
      }

      .${classes.arrow_left} {
        transform: rotate(232deg) skewX(25deg) skewY(8deg) !important; /* to override '.arrow' dynamic styles */

        &.${classes.arrow_loading} {
          &::before {
            animation: ${loadingAnimationArrow} 1s linear infinite;
            animation-direction: reverse;
          }
        }
      }

      .${classes.caption} {
        position: relative;
        white-space: nowrap;
        display: inline-block;
        width: 100%;
        vertical-align: top;
      }

      .${classes.icon} {
        display: inline-block;
        padding-right: 7px;
      }

      &.${classes.focus} {
        position: relative;
        z-index: 2;

        &:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}) {
          border: none;
        }

        &.${classes.errorRoot}, &.${classes.warningRoot} {
          border-color: transparent !important;
        }
      }

      &.${classes.checked} {
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), inset 0 1px 2px 0 rgba(0, 0, 0, 0.3);

        &:not(.${classes.focus}):hover {
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), inset 0 1px 2px 0 rgba(0, 0, 0, 0.3);
        }

        &.${classes.focus} {
          position: relative;
          z-index: 2;

          &.${classes.errorRoot}, &.${classes.warningRoot} {
            border-color: transparent !important;
          }
        }
      }

      &.${classes.disabled} {
        border-color: transparent;
      }
    `;
  },

  warning(t: ITheme) {
    return css`
      .${classes.root}:not(.${classes.link}) & {
        box-shadow: 0 0 0 2px ${t.borderColorWarning};
      }
    `;
  },

  error(t: ITheme) {
    return css`
      .${classes.root}:not(.${classes.link}) & {
        box-shadow: 0 0 0 2px ${t.borderColorError};
      }
      .${classes.wrap} .${classes.root}.${classes.link} & {
        background: ${t.errorSecondary};
      }
    `;
  },

  sizeSmall(t: ITheme) {
    return css`
      ${buttonArrowMixin('7.5px', '-9.6px', '-7.5px', '16.8px', 'rotate(53deg) skewX(24deg) skewY(10deg)')};
      ${buttonLoadingArrowMixin('7px', '7px', '-207px', '441%')};

      border-radius: ${t.btnSmallBorderRadius};

      ${buttonSizeMixin(
        t.btnFontSizeSmall,
        t.controlHeightSmall,
        t.btnHeightShift,
        t.controlLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
      )};

      .${classes.arrow} {
        right: ${t.btnSmallArrowRight};
        height: ${t.btnSmallArrowLength};
        width: ${t.btnSmallArrowLength};
        border-radius: ${t.btnSmallArrowBorderRadius};
      }

      .${classes.arrow_left} {
        left: ${t.btnSmallArrowLeft};
      }
    `;
  },

  sizeMedium(t: ITheme) {
    return css`
      ${buttonArrowMixin('9px', '-9.6px', '-10.2px', '20.2px', 'rotate(53deg) skewX(24deg) skewY(8deg)')};
      ${buttonLoadingArrowMixin('0', '0', '-208px', '441%')};
      .${classes.arrow}.${classes.arrow_loading} {
        &::before {
          background: linear-gradient(-56deg, transparent 46.9%, #ccc 0, #ccc 69.5%, transparent 0);
        }
      }

      ${buttonSizeMixin(
        t.btnFontSizeMedium,
        t.controlHeightMedium,
        t.btnHeightShift,
        t.controlLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
      )};

      .${classes.arrow} {
        transform: ${t.btnMediumArrowTransform};
      }

      .${classes.arrow_left} {
        left: ${t.btnMediumArrowLeft};
      }

      .${classes.arrow_left}.${classes.arrow_loading}::before {
        left: ${t.btnMediumArrowLeftLoadingLeft};
      }
    `;
  },

  sizeLarge(t: ITheme) {
    return css`
      ${buttonArrowMixin('10.2px', '-10.6px', '-10.8px', '21.7px', 'rotate(53deg) skewX(25deg) skewY(10deg)')};
      ${buttonLoadingArrowMixin('-32px', '-36px', '-198px', '700%')};

      .${classes.arrow}.${classes.arrow_loading} {
        &::before {
          background: linear-gradient(-56deg, transparent 48.2%, #ccc 0, #ccc 63.4%, transparent 0);
        }
      }

      ${buttonSizeMixin(
        t.btnFontSizeLarge,
        t.controlHeightLarge,
        t.btnHeightShift,
        t.controlLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
      )};

      .${classes.arrow} {
        transform: ${t.btnLargeArrowTransform};
      }

      .${classes.arrow_left} {
        left: ${t.btnLargeArrowLeft};
      }

      .${classes.arrow}.${classes.arrow_loading}::before {
        background: ${t.btnLargeArrowBg};
      }
    `;
  },

  link(t: ITheme) {
    return css`
      ${buttonLinkMixin()};

      color: ${t.linkColor};

      &:hover {
        color: ${t.linkHoverColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkActiveColor};
      }
    `;
  },

  focus(t: ITheme) {
    return css`
      .${classes.link}& {
        color: ${t.linkColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }

      &.${classes.root}:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}) {
        border: ${t.btnFocusBorder};

        &,
        &:hover,
        &:active,
        &.${classes.active},
        &.${classes.checked} {
          box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus};

          &.${classes.warningRoot},
          &.${classes.errorRoot} {
            box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
          }

          .${classes.arrow} {
            box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};

            &.${classes.arrow_warning} {
              box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning};
            }

            &.${classes.arrow_error} {
              box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorError};
            }
          }
        }
      }
    `;
  },

  disabled(t: ITheme) {
    return css`
      .${classes.wrap} .${classes.root}&:not(.${classes.link}) {
        background: ${t.btnDisabledBg};
        color: ${t.btnDisabledTextColor};
        box-shadow: ${t.btnDisabledShadow};

        .${classes.arrow} {
          background: ${t.btnDisabledBg};
          box-shadow: ${t.btnDisabledShadowArrow};

          &.${classes.arrow_warning} {
            box-shadow: 2px -2px 0 0 ${t.borderColorWarning};
          }

          &.${classes.arrow_error} {
            box-shadow: 2px -2px 0 0 ${t.borderColorError};
          }
        }
      }

      .${classes.wrap} &.${classes.root}.${classes.link} {
        color: ${t.linkDisabledColor};
      }
    `;
  },

  arrow_warning(t: ITheme) {
    return css`
      .${classes.wrap} .${classes.root} .${classes.arrow}& {
        box-shadow: 2px -2px 0 0 ${t.borderColorWarning};
      }
    `;
  },

  arrow_error(t: ITheme) {
    return css`
      .${classes.wrap} .${classes.root} .${classes.arrow}& {
        box-shadow: 2px -2px 0 0 ${t.borderColorError};
      }
    `;
  },

  default(t: ITheme) {
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
      )};

      ${buttonActiveMixin(
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveShadow,
        t.btnDefaultActiveShadowArrow,
        t.btnDefaultActiveShadowArrowLeft,
      )};

      &.${classes.root}.${classes.checked} {
        &,
        &:not(.${classes.focus}):hover {
          .${classes.arrow} {
            box-shadow: ${t.btnDefaultCheckedShadowArrow};
          }
          .${classes.arrow_left} {
            box-shadow: ${t.btnDefaultCheckedShadowArrow};
          }
        }
      }
    `;
  },

  primary(t: ITheme) {
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
      )};

      ${buttonActiveMixin(
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveShadow,
        t.btnPrimaryActiveShadowArrow,
        t.btnPrimaryActiveShadowArrowLeft,
      )};
    `;
  },

  success(t: ITheme) {
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
      )};

      ${buttonActiveMixin(
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveShadow,
        t.btnSuccessActiveShadowArrow,
        t.btnSuccessActiveShadowArrowLeft,
      )};
    `;
  },

  danger(t: ITheme) {
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
      )};

      ${buttonActiveMixin(
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveShadow,
        t.btnDangerActiveShadowArrow,
        t.btnDangerActiveShadowArrowLeft,
      )};
    `;
  },

  pay(t: ITheme) {
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
      )};

      ${buttonActiveMixin(
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveShadow,
        t.btnPayActiveShadowArrow,
        t.btnPayActiveShadowArrowLeft,
      )};
    `;
  },

  checked(t: ITheme) {
    return css`
      &.${classes.root} {
        &,
        &:not(.${classes.focus}):hover {
          background: ${t.btnCheckedBg};
          color: ${t.btnCheckedTextColor};
          box-shadow: ${t.btnCheckedShadow};

          .${classes.arrow} {
            background: ${t.btnCheckedBg};
            box-shadow: ${t.btnCheckedShadowArrow};
          }

          .${classes.arrow_left} {
            background: ${t.btnCheckedBg};
            box-shadow: ${t.btnCheckedShadowArrowLeft};
          }
        }

        &:not(.${classes.focus}):hover {
          border-color: ${t.btnCheckedHoverBorderColor};
        }
      }
    `;
  },

  wrap(t: ITheme) {
    return css`
      box-sizing: border-box;
      display: inline-block;
      padding: 1px;
      padding: ${t.btnWrapPadding};

      /*
      * common styles with
      * increased specificity
      */

      &.${classes.wrap_link} {
        padding: 0;
      }

      &.${classes.wrap_arrow} {
        margin-right: 10px;
      }

      &.${classes.wrap_arrow_left} {
        margin-right: 0;
        margin-left: 10px;
      }

      .${classes.root} {
        &.${classes.disabled} {
          cursor: default;
          pointer-events: none;

          .rt-ie-any & {
            outline-color: transparent;
          }
        }

        &.${classes.link} {
          display: inline;
          padding: 0;
          margin: 0;
          background: none;
          border: none;
          box-shadow: none;
          line-height: inherit;

          .${classes.caption} {
            display: inline;
          }

          .${classes.icon} {
            padding-right: ${t.linkIconPadding};
          }

          .${classes.warning}, .${classes.error} {
            left: -2px;
            right: -2px;
            bottom: -2px;
          }
        }
      }

      .${classes.narrow} {
        padding-left: 5px !important; /* to override dynamic styles */
        padding-right: 5px !important; /* to override dynamic styles */
      }

      .${classes.noPadding} {
        padding-left: 0 !important; /* to override dynamic styles */
        padding-right: 0 !important; /* to override dynamic styles */
      }

      .${classes.noRightPadding} {
        padding-right: 0 !important; /* to override dynamic styles */
      }
    `;
  },

  buttonWithIcon(t: ITheme) {
    return css`
      padding-right: 15px;
      padding-left: 15px;
    `;
  },

  loading(t: ITheme) {
    return css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: inherit;
      overflow: hidden;

      &:before {
        content: '';
        height: 100%;
        position: absolute;
        opacity: 0.2;
        background: linear-gradient(-110deg, #ccc 30%, transparent 0, transparent 60%, #ccc 0);
        background-size: 30px 100%;
        top: 0;
        left: 0;
        right: -30px;

        animation: ${loadingAnimation} 1s linear infinite;

        transform: rotateY(180deg) skewX(0deg) skewY(0deg);
      }
    `;
  },

  borderless(t: ITheme) {
    return css`
      &:not(.${classes.focus}):not(.${classes.disabled}):not(.${classes.active}):not(.${classes.checked}) {
        box-shadow: none !important; /* to override dynamic styles */

        &:hover,
        &:active {
          box-shadow: none !important; /* to override dynamic style */
        }
      }
    `;
  },
};

const loadingAnimation = keyframes`
  0% {
    transform: translateX(0) rotateY(180deg);
  }
  100% {
    transform: translateX(-30px) rotateY(180deg);
  }
`;

const loadingAnimationArrow = keyframes`
  0% {
    transform: translateX(50px) rotate(-44.3deg) skewX(0deg) skewY(0deg);
  }
  100% {
    transform: translateX(21px) translateY(30px) rotate(-44.3deg) skewX(0deg) skewY(0deg);
  }
`;

export default jsClasses;
