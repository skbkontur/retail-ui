import { css } from '../../lib/theming/Emotion';
import classes from './Button.less';
import { ITheme } from '../../lib/theming/Theme';
import DimensionFunctions from '../../lib/styles/DimensionFunctions';

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
      .${classes.root}&:not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}).${classes.warningRoot} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
      }
    `;
  },

  disabled(t: ITheme) {
    return css`
      .${classes.wrap} .${classes.root}&:not(.${classes.link}) {
        background: ${t.bgDisabled};
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
      background: ${
        t.btnDefaultBgStart === t.btnDefaultBgEnd
          ? t.btnDefaultBgStart
          : `linear-gradient(${t.btnDefaultBgStart}, ${t.btnDefaultBgEnd})`
      };
      color: ${t.btnDefaultTextColor};
      border: ${t.btnDefaultBorder};
      box-shadow: ${t.btnDefaultShadow};

      .${classes.arrow} {
        background: ${
          t.btnDefaultBgArrowStart === t.btnDefaultBgArrowEnd
            ? t.btnDefaultBgArrowStart
            : `linear-gradient(to bottom right, ${t.btnDefaultBgArrowStart}, ${t.btnDefaultBgArrowEnd})`
        };
        box-shadow: ${t.btnDefaultShadowArrow};
      }
      .${classes.root}.${classes.checked}& .${classes.arrow} {
        box-shadow: ${t.btnDefaultCheckedShadowArrow};
      }
      .${classes.root}.${classes.checked}& .${classes.arrow_left} {
        box-shadow: ${t.btnDefaultCheckedShadowArrow};
      }
      .${classes.arrow_left} {
        background: ${
          t.btnDefaultBgArrowStart === t.btnDefaultBgArrowEnd
            ? t.btnDefaultBgArrowStart
            : `linear-gradient(to top left, ${t.btnDefaultBgArrowStart}, ${t.btnDefaultBgArrowEnd})`
        };
        box-shadow: ${t.btnDefaultShadowArrowLeft};
      }

      &:hover {
        background: ${
          t.btnDefaultHoverBgStart === t.btnDefaultHoverBgEnd
            ? t.btnDefaultHoverBgStart
            : `linear-gradient(${t.btnDefaultHoverBgStart}, ${t.btnDefaultHoverBgEnd})`
        };
        box-shadow: ${t.btnDefaultHoverShadow};
        border-color: ${t.btnDefaultHoverBorderColor};

        .${classes.arrow} {
          background: ${
            t.btnDefaultHoverBgStart === t.btnDefaultHoverBgEnd
              ? t.btnDefaultHoverBgStart
              : `linear-gradient(to bottom right, ${t.btnDefaultHoverBgStart}, ${t.btnDefaultHoverBgEnd})`
          };
          box-shadow: ${t.btnDefaultHoverShadowArrow};
        }

        .${classes.arrow_left} {
          background: ${
            t.btnDefaultHoverBgStart === t.btnDefaultHoverBgEnd
              ? t.btnDefaultHoverBgStart
              : `linear-gradient(to top left, ${t.btnDefaultHoverBgStart}, ${t.btnDefaultHoverBgEnd})`
          };
          box-shadow: ${t.btnDefaultHoverShadowArrowLeft};
        }
      }

      &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {
        background: ${t.btnDefaultActiveBg};
        box-shadow: ${t.btnDefaultActiveShadow};

        .${classes.arrow} {
          background: ${t.btnDefaultActiveBg};
          box-shadow: ${t.btnDefaultActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnDefaultActiveShadowArrowLeft};
        }
      }

      .${classes.active}&:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {
        background: ${t.btnDefaultActiveBg};
        box-shadow: ${t.btnDefaultActiveShadow};

        .${classes.arrow} {
          background: ${t.btnDefaultActiveBg};
          box-shadow: ${t.btnDefaultActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnDefaultActiveShadowArrowLeft};
        }
      }
    `;
  },

  primary(t: ITheme) {
    return css`
      background: ${
        t.btnPrimaryBgStart === t.btnPrimaryBgEnd
          ? t.btnPrimaryBgStart
          : `linear-gradient(${t.btnPrimaryBgStart}, ${t.btnPrimaryBgEnd})`
      };
      color: ${t.btnPrimaryTextColor};
      border: ${t.btnPrimaryBorder};
      box-shadow: ${t.btnPrimaryShadow};

      .${classes.arrow} {
        background: ${
          t.btnPrimaryBgArrowStart === t.btnPrimaryBgArrowEnd
            ? t.btnPrimaryBgArrowStart
            : `linear-gradient(to bottom right, ${t.btnPrimaryBgArrowStart}, ${t.btnPrimaryBgArrowEnd})`
        };
        box-shadow: ${t.btnPrimaryShadowArrow};
      }

      .${classes.arrow_left} {
        background: ${
          t.btnPrimaryBgArrowStart === t.btnPrimaryBgArrowEnd
            ? t.btnPrimaryBgArrowStart
            : `linear-gradient(to top left, ${t.btnPrimaryBgArrowStart}, ${t.btnPrimaryBgArrowEnd})`
        };
        box-shadow: ${t.btnPrimaryShadowArrowLeft};
      }

      &:hover {
        background: ${
          t.btnPrimaryHoverBgStart === t.btnPrimaryHoverBgEnd
            ? t.btnPrimaryHoverBgStart
            : `linear-gradient(${t.btnPrimaryHoverBgStart}, ${t.btnPrimaryHoverBgEnd})`
        };
        box-shadow: ${t.btnPrimaryHoverShadow};
        border-color: ${t.btnPrimaryHoverBg};

        .${classes.arrow} {
          background: ${
            t.btnPrimaryHoverBgStart === t.btnPrimaryHoverBgEnd
              ? t.btnPrimaryHoverBgStart
              : `linear-gradient(to bottom right, ${t.btnPrimaryHoverBgStart}, ${t.btnPrimaryHoverBgEnd})`
          };
          box-shadow: ${t.btnPrimaryHoverShadowArrow};
        }

        .${classes.arrow_left} {
          background: ${
            t.btnPrimaryHoverBgStart === t.btnPrimaryHoverBgEnd
              ? t.btnPrimaryHoverBgStart
              : `linear-gradient(to top left, ${t.btnPrimaryHoverBgStart}, ${t.btnPrimaryHoverBgEnd})`
          };
          box-shadow: ${t.btnPrimaryHoverShadowArrowLeft};
        }
      }

      &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {
        background: ${t.btnPrimaryActiveBg};
        box-shadow: ${t.btnPrimaryActiveShadow};

        .${classes.arrow} {
          background: ${t.btnPrimaryActiveBg};
          box-shadow: ${t.btnPrimaryActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnPrimaryActiveShadowArrowLeft};
        }
      }
      .${classes.active}:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {
        background: ${t.btnPrimaryActiveBg};
        box-shadow: ${t.btnPrimaryActiveShadow};

        .${classes.arrow} {
          background: ${t.btnPrimaryActiveBg};
          box-shadow: ${t.btnPrimaryActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnPrimaryActiveShadowArrowLeft};
        }
      }
    `;
  },

  success(t: ITheme) {
    return css`
      background: ${
        t.btnSuccessBgStart === t.btnSuccessBgEnd
          ? t.btnSuccessBgStart
          : `linear-gradient(${t.btnSuccessBgStart}, ${t.btnSuccessBgEnd})`
      };
      color: ${t.btnSuccessTextColor};
      border: ${t.btnSuccessBorder};
      box-shadow: ${t.btnSuccessShadow};

      .${classes.arrow} {
        background: ${
          t.btnSuccessBgArrowStart === t.btnSuccessBgArrowEnd
            ? t.btnSuccessBgArrowStart
            : `linear-gradient(to bottom right, ${t.btnSuccessBgArrowStart}, ${t.btnSuccessBgArrowEnd})`
        };
        box-shadow: ${t.btnSuccessShadowArrow};
      }

      .${classes.arrow_left} {
        background: ${
          t.btnSuccessBgArrowStart === t.btnSuccessBgArrowEnd
            ? t.btnSuccessBgArrowStart
            : `linear-gradient(to top left, ${t.btnSuccessBgArrowStart}, ${t.btnSuccessBgArrowEnd})`
        };
        box-shadow: ${t.btnSuccessShadowArrowLeft};
      }

      &:hover {
        background: ${
          t.btnSuccessHoverBgStart === t.btnSuccessHoverBgEnd
            ? t.btnSuccessHoverBgStart
            : `linear-gradient(${t.btnSuccessHoverBgStart}, ${t.btnSuccessHoverBgEnd})`
        };
        box-shadow: ${t.btnSuccessHoverShadow};
        border-color: ${t.btnSuccessHoverBg};

        .${classes.arrow} {
          background: ${
            t.btnSuccessHoverBgStart === t.btnSuccessHoverBgEnd
              ? t.btnSuccessHoverBgStart
              : `linear-gradient(to bottom right, ${t.btnSuccessHoverBgStart}, ${t.btnSuccessHoverBgEnd})`
          };
          box-shadow: ${t.btnSuccessHoverShadowArrow};
        }

        .${classes.arrow_left} {
          background: ${
            t.btnSuccessHoverBgStart === t.btnSuccessHoverBgEnd
              ? t.btnSuccessHoverBgStart
              : `linear-gradient(to top left, ${t.btnSuccessHoverBgStart}, ${t.btnSuccessHoverBgEnd})`
          };
          box-shadow: ${t.btnSuccessHoverShadowArrowLeft};
        }
      }

      &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {
        background: ${t.btnSuccessActiveBg};
        box-shadow: ${t.btnSuccessActiveShadow};

        .${classes.arrow} {
          background: ${t.btnSuccessActiveBg};
          box-shadow: ${t.btnSuccessActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnSuccessActiveShadowArrowLeft};
        }
      }
      .${classes.active}:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {
        background: ${t.btnSuccessActiveBg};
        box-shadow: ${t.btnSuccessActiveShadow};

        .${classes.arrow} {
          background: ${t.btnSuccessActiveBg};
          box-shadow: ${t.btnSuccessActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnSuccessActiveShadowArrowLeft};
        }
      }
    `;
  },

  danger(t: ITheme) {
    return css`
      background: ${
        t.btnDangerBgStart === t.btnDangerBgEnd
          ? t.btnDangerBgStart
          : `linear-gradient(${t.btnDangerBgStart}, ${t.btnDangerBgEnd})`
      };
      color: ${t.btnDangerTextColor};
      border: ${t.btnDangerBorder};
      box-shadow: ${t.btnDangerShadow};

      .${classes.arrow} {
        background: ${
          t.btnDangerBgArrowStart === t.btnDangerBgArrowEnd
            ? t.btnDangerBgArrowStart
            : `linear-gradient(to bottom right, ${t.btnDangerBgArrowStart}, ${t.btnDangerBgArrowEnd})`
        };
        box-shadow: ${t.btnDangerShadowArrow};
      }

      .${classes.arrow_left} {
        background: ${
          t.btnDangerBgArrowStart === t.btnDangerBgArrowEnd
            ? t.btnDangerBgArrowStart
            : `linear-gradient(to top left, ${t.btnDangerBgArrowStart}, ${t.btnDangerBgArrowEnd})`
        };
        box-shadow: ${t.btnDangerShadowArrowLeft};
      }

      &:hover {
        background: ${
          t.btnDangerBgStart === t.btnDangerBgEnd
            ? t.btnDangerBgStart
            : `linear-gradient(${t.btnDangerHoverBgStart}, ${t.btnDangerHoverBgEnd})`
        };
        box-shadow: ${t.btnDangerHoverShadow};
        border-color: ${t.btnDangerHoverBg};

        .${classes.arrow} {
          background: ${
            t.btnDangerBgStart === t.btnDangerBgEnd
              ? t.btnDangerBgStart
              : `linear-gradient(to bottom right, ${t.btnDangerHoverBgStart}, ${t.btnDangerHoverBgEnd})`
          };
          box-shadow: ${t.btnDangerHoverShadowArrow};
        }

        .${classes.arrow_left} {
          background: ${
            t.btnDangerBgStart === t.btnDangerBgEnd
              ? t.btnDangerBgStart
              : `linear-gradient(to top left, ${t.btnDangerHoverBgStart}, ${t.btnDangerHoverBgEnd})`
          };
          box-shadow: ${t.btnDangerHoverShadowArrowLeft};
        }
      }

      &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {
        background: ${t.btnDangerActiveBg};
        box-shadow: ${t.btnDangerActiveShadow};

        .${classes.arrow} {
          background: ${t.btnDangerActiveBg};
          box-shadow: ${t.btnDangerActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnDangerActiveShadowArrowLeft};
        }
      }
      .${classes.active}:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {
        background: ${t.btnDangerActiveBg};
        box-shadow: ${t.btnDangerActiveShadow};

        .${classes.arrow} {
          background: ${t.btnDangerActiveBg};
          box-shadow: ${t.btnDangerActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnDangerActiveShadowArrowLeft};
        }
      }
    `;
  },

  pay(t: ITheme) {
    return css`
      background: ${
        t.btnPayBgStart === t.btnPayBgEnd ? t.btnPayBgStart : `linear-gradient(${t.btnPayBgStart}, ${t.btnPayBgEnd})`
      };
      color: ${t.btnPayTextColor};
      border: ${t.btnPayBorder};
      box-shadow: ${t.btnPayShadow};

      .${classes.arrow} {
        background: ${
          t.btnPayBgArrowStart === t.btnPayBgArrowEnd
            ? t.btnPayBgArrowStart
            : `linear-gradient(to bottom right, ${t.btnPayBgArrowStart}, ${t.btnPayBgArrowEnd})`
        };
        box-shadow: ${t.btnPayShadowArrow};
      }

      .${classes.arrow_left} {
        background: ${
          t.btnPayBgArrowStart === t.btnPayBgArrowEnd
            ? t.btnPayBgArrowStart
            : `linear-gradient(to top left, ${t.btnPayBgArrowStart}, ${t.btnPayBgArrowEnd})`
        };
        box-shadow: ${t.btnPayShadowArrowLeft};
      }

      .${classes.arrow}.${classes.arrow_warning} {
        box-shadow: 2px -2px 0 0 ${t.borderColorWarning};
      }

      .${classes.arrow}.${classes.arrow_error} {
        box-shadow: 2px -2px 0 0 ${t.borderColorError};
      }

      &:hover {
        background: ${
          t.btnPayHoverBgStart === t.btnPayHoverBgEnd
            ? t.btnPayHoverBgStart
            : `linear-gradient(${t.btnPayHoverBgStart}, ${t.btnPayHoverBgEnd})`
        };
        box-shadow: ${t.btnPayHoverShadow};
        border-color: ${t.btnPayHoverBg};

        .${classes.arrow} {
          background: ${
            t.btnPayHoverBgStart === t.btnPayHoverBgEnd
              ? t.btnPayHoverBgStart
              : `linear-gradient(to bottom right, ${t.btnPayHoverBgStart}, ${t.btnPayHoverBgEnd})`
          };
          box-shadow: ${t.btnPayHoverShadowArrow};
        }

        .${classes.arrow_left} {
          background: ${
            t.btnPayHoverBgStart === t.btnPayHoverBgEnd
              ? t.btnPayHoverBgStart
              : `linear-gradient(to top left, ${t.btnPayHoverBgStart}, ${t.btnPayHoverBgEnd})`
          };
          box-shadow: ${t.btnPayHoverShadowArrowLeft};
        }
      }

      &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):active {
        background: ${t.btnPayActiveBg};
        box-shadow: ${t.btnPayActiveShadow};

        .${classes.arrow} {
          background: ${t.btnPayActiveBg};
          box-shadow: ${t.btnPayActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnPayActiveShadowArrowLeft};
        }
      }
      .${classes.active}:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading})& {
        background: ${t.btnPayActiveBg};
        box-shadow: ${t.btnPayActiveShadow};

        .${classes.arrow} {
          background: ${t.btnPayActiveBg};
          box-shadow: ${t.btnPayActiveShadowArrow};
        }

        .${classes.arrow_left} {
          box-shadow: ${t.btnPayActiveShadowArrowLeft};
        }
      }
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
