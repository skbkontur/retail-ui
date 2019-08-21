import { css } from '../../lib/theming/Emotion';
import classes from './Button.less';
import { ITheme } from '../../lib/theming/Theme';
import DimensionFunctions from '../../lib/styles/DimensionFunctions';
import { resetButton, resetText } from '../../lib/styles/Mixins';

import { buttonUseMixin, buttonHoverMixin, buttonActiveMixin } from './Button.mixins';

const getBtnPadding = (fontSize: string, paddingY: string, paddingX: string, additionalOffset: number = 0): string => {
  let paddingTop = paddingY;
  let paddingBottom = paddingY;

  const shiftUp = (top: string, bottom: string, offset: number) => {
    return [DimensionFunctions.shift(top, `${-offset}`), DimensionFunctions.shift(bottom, `${offset}`)];
  };

  if (fontSize === '16px') {
    [paddingTop, paddingBottom] = shiftUp(paddingTop, paddingBottom, 1);
  }
  if (additionalOffset) {
    [paddingTop, paddingBottom] = shiftUp(paddingTop, paddingBottom, additionalOffset);
  }

  return `${paddingTop} ${paddingX} ${paddingBottom}`;
};

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

  warningRoot(t: ITheme) {
    return css`
      .${classes.root}.${classes.focus}& {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
      }
      .${classes.root}.${classes.checked}.${classes.focus}& {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
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

  errorRoot(t: ITheme) {
    return css`
      .${classes.root}.${classes.focus}& {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
      }
      .${classes.root}.${classes.checked}.${classes.focus}& {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
      }
    `;
  },

  sizeSmall(t: ITheme) {
    return css`
      font-size: ${t.btnFontSizeSmall};
      border-radius: ${t.btnSmallBorderRadius};

      &:not(.${classes.link}) {
        height: ${DimensionFunctions.shift(t.controlHeightSmall, t.btnHeightShift)};
        padding: ${getBtnPadding(t.btnFontSizeSmall, t.controlPaddingYSmall, '15px')};
        line-height: ${t.controlLineHeightSmall};

        .rt-ie-any & {
          padding: ${getBtnPadding(t.btnFontSizeSmall, t.controlPaddingYSmall, '15px', 1)};
        }
      }

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
      font-size: ${t.btnFontSizeMedium};

      &:not(.${classes.link}) {
        padding: ${getBtnPadding(t.btnFontSizeMedium, t.controlPaddingYMedium, '15px')};
        height: ${DimensionFunctions.shift(t.controlHeightMedium, t.btnHeightShift)};
        line-height: ${t.controlLineHeightMedium};

        .rt-ie-any & {
          padding: ${getBtnPadding(t.btnFontSizeMedium, t.controlPaddingYMedium, '15px', 1)};
        }

        .${classes.arrow} {
          transform: ${t.btnMediumArrowTransform};
        }

        .${classes.arrow_left} {
          left: ${t.btnMediumArrowLeft};
        }

        .${classes.arrow_left}.${classes.arrow_loading}::before {
          left: ${t.btnMediumArrowLeftLoadingLeft};
        }
      }
    `;
  },

  sizeLarge(t: ITheme) {
    return css`
      font-size: ${t.btnFontSizeLarge};

      &:not(.${classes.link}) {
        padding: ${getBtnPadding(t.btnFontSizeLarge, t.controlPaddingYLarge, '20px')};
        height: ${DimensionFunctions.shift(t.controlHeightLarge, t.btnHeightShift)};
        line-height: ${t.controlLineHeightLarge};

        .rt-ie-any & {
          padding: ${getBtnPadding(t.btnFontSizeLarge, t.controlPaddingYLarge, '20px', 1)};
        }

        .${classes.arrow} {
          transform: ${t.btnLargeArrowTransform};
        }

        .${classes.arrow_left} {
          left: ${t.btnLargeArrowLeft};
        }

        .${classes.arrow}.${classes.arrow_loading}::before {
          background: ${t.btnLargeArrowBg};
        }
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
      .${classes.root}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}) {
        border: ${t.btnFocusBorder};
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus};
      }
      .${classes.root}.${classes.checked}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}) {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus};
      }
      .${classes.root}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}).${classes.errorRoot} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
      }
      .${classes.root}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}).${classes.active} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus};
      }
      .${classes.root}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}).${
      classes.warningRoot
    } {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
      }
    `;
  },

  disabled(t: ITheme) {
    return css`
      .${classes.wrap} .${classes.root}&:not(.${classes.link}) {
        background: ${t.bgDisabled};
        color: ${t.btnDisabledTextColor};
      }
      .${classes.root}& {
        box-shadow: ${t.btnDisabledShadow};
      }
    `;
  },

  arrow(t: ITheme) {
    return css`
      .${classes.root}.${classes.focus} & {
        box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};
      }
      .${classes.root}.${classes.focus}:hover & {
        box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};
      }
      .${classes.root}.${classes.focus}:active & {
        box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};
      }
      .${classes.root}.${classes.focus}.${classes.active} & {
        box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};
      }
      .${classes.root}.${classes.checked} & {
        background: ${t.btnCheckedBg};
        box-shadow: ${t.btnCheckedShadowArrow};
      }
      .${classes.root}.${classes.checked}:hover & {
        background: ${t.btnCheckedBg};
        box-shadow: ${t.btnCheckedShadowArrowLeft};
      }

      .${classes.root}.${classes.checked}.${classes.focus} & {
        box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};
      }
      .${classes.root}.${classes.disabled} & {
        background: ${t.btnDisabledBg};
        box-shadow: 1px -1px 0 0 ${t.btnDisabledShadowColor};
      }
    `;
  },

  arrow_left(t: ITheme) {
    return css`
      .${classes.root}.${classes.default}.${classes.checked} & {
        box-shadow: ${t.btnDefaultCheckedShadowArrow};
      }
      .${classes.root}.${classes.checked} & {
        background: ${t.btnCheckedBg};
        box-shadow: ${t.btnCheckedShadowArrowLeft};
      }
      .${classes.root}.${classes.checked}:hover & {
        background: ${t.btnCheckedBg};
        box-shadow: ${t.btnCheckedShadowArrowLeft};
      }
    `;
  },

  arrow_warning(t: ITheme) {
    return css`
      .${classes.root} .${classes.arrow}& {
        box-shadow: 2px -2px 0 0 ${t.borderColorWarning};
      }
      .${classes.root}.${classes.focus} .${classes.arrow}& {
        box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning};
      }
      .${classes.root}.${classes.checked} .${classes.arrow}& {
        box-shadow: inset 0 4px 2px -3px ${t.btnCheckedShadowColorArrow}, 2px -2px 0 0 ${t.borderColorWarning};
      }
      .${classes.root}.${classes.checked}.${classes.focus} .${classes.arrow}& {
        box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning};
      }
      .${classes.root}.${classes.disabled} .${classes.arrow}& {
        box-shadow: 2px -2px 0 0 ${t.borderColorWarning};
      }
    `;
  },

  arrow_error(t: ITheme) {
    return css`
      .${classes.root} .${classes.arrow}& {
        box-shadow: 2px -2px 0 0 ${t.borderColorError};
      }
      .${classes.root}.${classes.focus} .${classes.arrow}& {
        box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorError};
      }
      .${classes.root}.${classes.checked} .${classes.arrow}& {
        box-shadow: inset 0 4px 2px -3px ${t.btnCheckedShadowColorArrow}, 2px -2px 0 0 ${t.borderColorError};
      }
      .${classes.root}.${classes.checked}.${classes.focus} .${classes.arrow}& {
        box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorError};
      }
      .${classes.root}.${classes.disabled} .${classes.arrow}& {
        box-shadow: 2px -2px 0 0 ${t.borderColorError};
      }
    `;
  },

  default(t: ITheme) {
    return css`
      .${classes.root}.${classes.checked}& .${classes.arrow} {
        box-shadow: ${t.btnDefaultCheckedShadowArrow};
      }
      .${classes.root}.${classes.checked}& .${classes.arrow_left} {
        box-shadow: ${t.btnDefaultCheckedShadowArrow};
      }

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
      .${classes.root}& {
        background: ${t.btnCheckedBg};
        color: ${t.btnCheckedTextColor};
        box-shadow: ${t.btnCheckedShadow};
      }
      .${classes.root}&:not(.${classes.focus}):hover {
        background: ${t.btnCheckedBg};
        border-color: ${t.btnCheckedHoverBorderColor};
        box-shadow: ${t.btnCheckedShadow};
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
