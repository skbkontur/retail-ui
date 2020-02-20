import { css, keyframes } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';
import { linkMixin, linkDisabledMixin } from '../Link/Link.mixins';

import classes from './Button.module.less';
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

      width: 100%;
      text-align: center;
      color: ${t.textColorDefault};
      border-radius: ${t.btnBorderRadius};
    `;
  },

  warning(t: Theme) {
    return css`
      .${classes.root}:not(.${classes.link}) & {
        box-shadow: 0 0 0 2px ${t.borderColorWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      .${classes.root}:not(.${classes.link}) & {
        box-shadow: 0 0 0 2px ${t.borderColorError};
      }
      .${classes.wrap} .${classes.root}.${classes.link} & {
        background: ${t.errorSecondary};
      }
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
      )};

      .${classes.arrow} {
        border-radius: ${t.btnSmallArrowBorderRadius};
      }

      ${buttonArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowLeft,
        t.btnSmallArrowRight,
        t.btnSmallArrowLength,
        'rotate(53deg) skewX(24deg) skewY(10deg)',
      )};

      ${buttonLoadingArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowTop,
        '-207px',
        '441%',
        t.btnSmallArrowBg,
        t.btnSmallArrowLeftLoadingDelay,
        btn_loading_arrow,
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
      )};

      ${buttonArrowMixin('9px', t.btnMediumArrowLeft, t.btnMediumArrowRight, '20.2px', t.btnMediumArrowTransform)};
      ${buttonLoadingArrowMixin(
        '0',
        '0',
        t.btnMediumArrowLeftLoadingLeft,
        '441%',
        t.btnMediumArrowBg,
        t.btnMediumArrowLeftLoadingDelay,
        btn_loading_arrow,
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
      )};

      ${buttonArrowMixin('10.2px', t.btnLargeArrowLeft, '-10.8px', '22.2px', t.btnLargeArrowTransform)};

      ${buttonLoadingArrowMixin(
        '-32px',
        '-36px',
        ' -198px',
        '700%',
        t.btnLargeArrowBg,
        t.btnLargeArrowLeftLoadingDelay,
        btn_loading_arrow,
      )};
    `;
  },

  link(t: Theme) {
    return css`
      &.${classes.link} {
        ${linkMixin()};

        color: ${t.linkColor};
        border-radius: ${t.btnLinkBorderRadius};

        &:hover {
          color: ${t.linkHoverColor};
          text-decoration: ${t.linkHoverTextDecoration};
        }
        &:active {
          color: ${t.linkActiveColor};
        }

        .${classes.icon} {
          padding-right: ${t.linkIconMarginRight};
        }
      }
    `;
  },

  focus(t: Theme) {
    return css`
      .${classes.link}& {
        color: ${t.linkColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }

      &.${classes.root}:not(.${classes.disabled}):not(.${classes.link}) {
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

  disabled(t: Theme) {
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
        ${linkDisabledMixin()};
        color: ${t.linkDisabledColor};
      }
    `;
  },

  arrow(t: Theme) {
    return css`
      border-radius: ${t.btnArrowBorderRadius};
    `;
  },

  arrow_warning(t: Theme) {
    return css`
      .${classes.wrap} .${classes.root} .${classes.arrow}& {
        box-shadow: 2px -2px 0 0 ${t.borderColorWarning};
      }
    `;
  },

  arrow_error(t: Theme) {
    return css`
      .${classes.wrap} .${classes.root} .${classes.arrow}& {
        box-shadow: 2px -2px 0 0 ${t.borderColorError};
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

  checked(t: Theme) {
    return css`
      &.${classes.root} {
        &,
        &:not(.${classes.focus}):hover {
          background: ${t.btnCheckedBg};
          color: ${t.btnCheckedTextColor};
          box-shadow: ${t.btnCheckedShadow} !important;

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

  wrap(t: Theme) {
    return css`
      padding: ${t.btnWrapPadding};
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
