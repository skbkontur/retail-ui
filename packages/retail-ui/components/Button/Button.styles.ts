import { css } from '../../lib/theming/Emotion';
import classes from './Button.less';
import { ITheme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';

import { buttonUseMixin, buttonHoverMixin, buttonActiveMixin, buttonSizeMixin } from './Button.mixins';

const jsClasses = {
  root(t: ITheme) {
    return css`
      ${resetButton()};
      ${resetText()};

      width: 100%;
      text-align: center;
      color: ${t.textColorDefault};
      border-radius: ${t.btnBorderRadius};
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
      border-radius: ${t.btnSmallBorderRadius};

      ${buttonSizeMixin(
        t.btnFontSizeSmall,
        t.controlHeightSmall,
        t.btnHeightShift,
        t.controlLineHeightSmall,
        '15px',
        t.controlPaddingYSmall,
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
      ${buttonSizeMixin(
        t.btnFontSizeMedium,
        t.controlHeightMedium,
        t.btnHeightShift,
        t.controlLineHeightMedium,
        '15px',
        t.controlPaddingYMedium,
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
      ${buttonSizeMixin(
        t.btnFontSizeLarge,
        t.controlHeightLarge,
        t.btnHeightShift,
        t.controlLineHeightLarge,
        '20px',
        t.controlPaddingYLarge,
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

            &.${jsClasses.arrow_warning(t)} {
              box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning};
            }

            &.${jsClasses.arrow_error(t)} {
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
        background: ${t.bgDisabled};
        color: ${t.btnDisabledTextColor};
        box-shadow: ${t.btnDisabledShadow};

        .${classes.arrow} {
          background: ${t.btnDisabledBg};
          box-shadow: 1px -1px 0 0 ${t.btnDisabledShadowColor};

          &.${jsClasses.arrow_warning(t)} {
            box-shadow: 2px -2px 0 0 ${t.borderColorWarning};
          }

          &.${jsClasses.arrow_error(t)} {
            box-shadow: 2px -2px 0 0 ${t.borderColorError};
          }
        }
      }
    `;
  },

  arrow_warning(t: ITheme) {
    return css`
      .${classes.root}.${classes.warningRoot} .${classes.arrow}& {
        box-shadow: 2px -2px 0 0 ${t.borderColorWarning};
      }
    `;
  },

  arrow_error(t: ITheme) {
    return css`
      .${classes.root}.${classes.errorRoot} .${classes.arrow}& {
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
      padding: ${t.btnWrapPadding};
    `;
  },
};

export default jsClasses;
