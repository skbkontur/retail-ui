import { css, cssName, keyframes /* memoizeStyle */ } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';
import { isIE11, isEdge } from '../../lib/utils';

import {
  buttonUseMixin,
  buttonHoverMixin,
  buttonActiveMixin,
  buttonActiveCaptionMixin,
  buttonSizeMixin,
  buttonLinkSizeMixin,
  buttonArrowSizeMixin,
  buttonIconSizeMixin,
  buttonLoadingArrowMixin,
} from './Button.mixins';
import { ButtonProps } from './Button';

const btn_loading_arrow = keyframes`
0% {
  transform: translateX(50px) rotate(-44.3deg);
}

100% {
  transform: translateX(21px) translateY(30px) rotate(-44.3deg);
}
`;

export interface ButtonStylesProps extends ButtonProps {
  focus: boolean;
}

const styles = {
  root(t: Theme, p: ButtonStylesProps) {
    const {
      use,
      size,
      error,
      warning,
      borderless,
      focus,
      checked,
      disabled,
      loading,
      narrow,
      _noPadding,
      _noRightPadding,
    } = p;
    return css`
      ${resetButton()};
      ${resetText()};

      background-clip: border-box;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
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

      ${size === 'small' ? styles.sizeSmall(t, p) : ``}
      ${size === 'medium' ? styles.sizeMedium(t, p) : ``}
      ${size === 'large' ? styles.sizeLarge(t, p) : ``}

      ${
        use === 'link'
          ? css`
              ${styles.link(t, p)}
            `
          : css`
            ${use === 'default' ? styles.default(t, p) : ``}
            ${use === 'primary' ? styles.primary(t, p) : ``}
            ${use === 'success' ? styles.success(t, p) : ``}
            ${use === 'danger' ? styles.danger(t, p) : ``}
            ${use === 'pay' ? styles.pay(t, p) : ``}

            ${error ? styles.error(t, p) : ``}
            ${warning ? styles.warning(t, p) : ``}

            ${focus ? styles.focus(t, p) : ``}
            ${checked ? styles.checked(t, p) : ``}
            ${disabled || loading ? styles.disabled(t, p) : ``}
            ${loading ? styles.loading(t, p) : ``}

            ${narrow ? styles.narrow() : ``}
            ${_noPadding ? styles.noPadding() : ``}
            ${_noRightPadding ? styles.noRightPadding() : ``}
            ${borderless ? styles.borderless(t, p) : ``}

            &:active {
              ${cssName(styles.caption(t, p))} {
                ${buttonActiveCaptionMixin()}
              }
            }
          `
      }
    `;
  },

  outline(t: Theme, p: ButtonStylesProps) {
    const { use, error, warning } = p;
    return css`
      border-radius: inherit;
      position: absolute;
      top: 0;

      ${use === 'link'
        ? `
            left: -2px;
            right: -2px;
            bottom: -2px;

            ${
              error
                ? `
                  background: ${t.btnErrorSecondary};
                `
                : ``
            }
          `
        : `
          bottom: 0;
          left: 0;
          right: 0;

          ${
            error
              ? `
                box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError};
              `
              : ``
          }

          ${
            warning
              ? `
                box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning};
              `
              : ``
          }
        `}
    `;
  },

  sizeSmall(t: Theme, p: ButtonStylesProps) {
    const { use, arrow } = p;
    return css`
      ${use === 'link'
        ? `
          ${buttonLinkSizeMixin(t.btnFontSizeSmall)};
        `
        : `
          ${buttonSizeMixin(
            t.btnFontSizeSmall,
            t.btnHeightSmall,
            t.btnHeightShift,
            t.btnLineHeightSmall,
            t.btnPaddingXSmall,
            t.btnPaddingYSmall,
            t.btnBorderRadiusSmall,
          )};

          ${cssName(styles.arrow())} {
            border-radius: ${t.btnSmallArrowBorderRadius};
          }

          ${buttonArrowSizeMixin(
            t.btnSmallArrowTop,
            t.btnSmallArrowLeft,
            t.btnSmallArrowRight,
            t.btnSmallArrowLength,
            'rotate(53deg) skewX(24deg) skewY(10deg)',
            cssName(styles.arrow()),
            arrow === 'left',
          )};
      `}
    `;
  },

  sizeMedium(t: Theme, p: ButtonStylesProps) {
    const { use, arrow } = p;
    return css`
      ${use === 'link'
        ? `
          ${buttonLinkSizeMixin(t.btnFontSizeMedium)};
        `
        : `
          ${buttonSizeMixin(
            t.btnFontSizeMedium,
            t.btnHeightMedium,
            t.btnHeightShift,
            t.btnLineHeightMedium,
            t.btnPaddingXMedium,
            t.btnPaddingYMedium,
            t.btnBorderRadiusMedium,
          )};

          ${buttonArrowSizeMixin(
            t.btnMediumArrowTop,
            t.btnMediumArrowLeft,
            t.btnMediumArrowRight,
            t.btnMediumArrowLength,
            t.btnMediumArrowTransform,
            cssName(styles.arrow()),
            arrow === 'left',
          )};
        `}
    `;
  },

  sizeLarge(t: Theme, p: ButtonStylesProps) {
    const { use, arrow } = p;
    return css`
      ${use === 'link'
        ? `
          ${buttonLinkSizeMixin(t.btnFontSizeLarge)};
        `
        : `
          ${buttonSizeMixin(
            t.btnFontSizeLarge,
            t.btnHeightLarge,
            t.btnHeightShift,
            t.btnLineHeightLarge,
            t.btnPaddingXLarge,
            t.btnPaddingYLarge,
            t.btnBorderRadiusLarge,
          )};

          ${buttonArrowSizeMixin(
            t.btnLargeArrowTop,
            t.btnLargeArrowLeft,
            t.btnLargeArrowRight,
            t.btnLargeArrowLength,
            t.btnLargeArrowTransform,
            cssName(styles.arrow()),
            arrow === 'left',
          )};
      `}
    `;
  },

  sizeSmallLoading(t: Theme, p: ButtonStylesProps) {
    const { arrow } = p;
    return css`
      ${buttonLoadingArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowTop,
        '-207px',
        '441%',
        t.btnSmallArrowBg,
        t.btnSmallArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(styles.arrow()),
        arrow === 'left',
      )}
    `;
  },

  sizeMediumLoading(t: Theme, p: ButtonStylesProps) {
    const { arrow } = p;
    return css`
      ${buttonLoadingArrowMixin(
        '0',
        '0',
        t.btnMediumArrowLeftLoadingLeft,
        '441%',
        t.btnMediumArrowBg,
        t.btnMediumArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(styles.arrow()),
        arrow === 'left',
      )};
    `;
  },

  sizeLargeLoading(t: Theme, p: ButtonStylesProps) {
    const { arrow } = p;
    return css`
      ${buttonLoadingArrowMixin(
        '-32px',
        '-36px',
        ' -198px',
        '700%',
        t.btnLargeArrowBg,
        t.btnLargeArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(styles.arrow()),
        arrow === 'left',
      )};
    `;
  },

  link(t: Theme, p: ButtonStylesProps) {
    const { disabled, focus } = p;
    return css`
      background: none;
      border-radius: ${t.btnLinkBorderRadius};
      border: none;
      box-shadow: none;
      color: ${t.btnLinkColor};
      display: inline;
      line-height: inherit;
      margin: 0;
      padding: 0;

      &:hover {
        color: ${t.btnLinkHoverColor};
        text-decoration: ${t.btnLinkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkActiveColor};

        ${cssName(styles.caption(t, p))} {
          transform: none;
        }
      }

      ${focus
        ? `
          color: ${t.btnLinkColor};
          text-decoration: ${t.btnLinkHoverTextDecoration};
        `
        : ``}

      ${disabled
        ? `
          cursor: default;
          pointer-events: none;
          color: ${t.btnLinkDisabledColor};
        `
        : ``};
    `;
  },

  focus(t: Theme, p: ButtonStylesProps) {
    const { disabled, error, warning } = p;
    return css`
      border-color: transparent;
      position: relative;
      z-index: 2;

      ${!disabled
        ? `
          border: ${t.btnFocusBorder};

          &,
          &:hover,
          &:active {
            box-shadow: inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus},
              0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus};

            ${
              error || warning
                ? `
                  box-shadow: inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus};
                  border-color: transparent;
                `
                : ''
            }

            ${cssName(styles.arrow())} {
              box-shadow: inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
                ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorFocus};

              ${
                warning
                  ? `
                    box-shadow: inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
                    ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorWarning};`
                  : ``
              }

              ${
                error
                  ? `
                    box-shadow: inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
                    ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorError};
                  `
                  : ``
              }
            }
          }
        `
        : ``}
    `;
  },

  disabled(t: Theme, p: ButtonStylesProps) {
    return css`
      cursor: default;
      pointer-events: none;
      border-color: transparent;
      background: ${t.btnDisabledBg};
      color: ${t.btnDisabledTextColor};
      box-shadow: ${t.btnDisabledShadow};

      ${isIE11 || isEdge
        ? `
          outline-color: transparent;
        `
        : ``}

      ${cssName(styles.arrow())} {
        background: ${t.btnDisabledBg};
        box-shadow: ${t.btnDisabledShadowArrow};
      }
    `;
  },

  error(t: Theme, p: ButtonStylesProps) {
    return css`
      &,
      &:hover,
      &:active {
        ${cssName(styles.arrow())} {
          box-shadow: ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorError};
        }
      }
    `;
  },

  warning(t: Theme, p: ButtonStylesProps) {
    return css`
      &,
      &:hover,
      &:active {
        ${cssName(styles.arrow())} {
          box-shadow: ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorWarning};
        }
      }
    `;
  },

  default(t: Theme, p: ButtonStylesProps) {
    const { arrow, active } = p;
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
        cssName(styles.arrow()),
        arrow === 'left',
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
        t.btnDefaultHoverBorderColor,
        cssName(styles.arrow()),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        !!active,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveShadow,
        t.btnDefaultActiveShadowArrow,
        t.btnDefaultActiveShadowArrowLeft,
        cssName(styles.arrow()),
        arrow === 'left',
      )};
    `;
  },

  primary(t: Theme, p: ButtonStylesProps) {
    const { arrow, active } = p;
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
        cssName(styles.arrow()),
        arrow === 'left',
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
        t.btnPrimaryHoverBorderColor,
        cssName(styles.arrow()),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        !!active,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveShadow,
        t.btnPrimaryActiveShadowArrow,
        t.btnPrimaryActiveShadowArrowLeft,
        cssName(styles.arrow()),
        arrow === 'left',
      )};
    `;
  },

  success(t: Theme, p: ButtonStylesProps) {
    const { arrow, active } = p;
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
        cssName(styles.arrow()),
        arrow === 'left',
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
        t.btnSuccessHoverBorderColor,
        cssName(styles.arrow()),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        !!active,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveShadow,
        t.btnSuccessActiveShadowArrow,
        t.btnSuccessActiveShadowArrowLeft,
        cssName(styles.arrow()),
        arrow === 'left',
      )};
    `;
  },

  danger(t: Theme, p: ButtonStylesProps) {
    const { arrow, active } = p;
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
        cssName(styles.arrow()),
        arrow === 'left',
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
        t.btnDangerHoverBorderColor,
        cssName(styles.arrow()),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        !!active,
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveShadow,
        t.btnDangerActiveShadowArrow,
        t.btnDangerActiveShadowArrowLeft,
        cssName(styles.arrow()),
        arrow === 'left',
      )};
    `;
  },

  pay(t: Theme, p: ButtonStylesProps) {
    const { arrow, active } = p;
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
        cssName(styles.arrow()),
        arrow === 'left',
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
        t.btnPayHoverBorderColor,
        cssName(styles.arrow()),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        !!active,
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveShadow,
        t.btnPayActiveShadowArrow,
        t.btnPayActiveShadowArrowLeft,
        cssName(styles.arrow()),
        arrow === 'left',
      )};
    `;
  },

  checked(t: Theme, p: ButtonStylesProps) {
    const { arrow } = p;
    return css`
      &,
      &:hover,
      &:active {
        box-shadow: ${t.btnCheckedShadow};
        background: ${t.btnCheckedBg};
        color: ${t.btnCheckedTextColor};
        border: ${t.btnDefaultCheckedBorder};

        ${cssName(styles.arrow())} {
          background: ${t.btnCheckedBg};
          box-shadow: ${t.btnCheckedShadowArrow};

          ${arrow === 'left'
            ? `
              box-shadow: ${t.btnCheckedShadowArrowLeft};
            `
            : ``}
        }
      }
    `;
  },

  caption(t: Theme, p: ButtonStylesProps) {
    const { use, active, checked, disabled } = p;
    return css`
      position: relative;
      white-space: nowrap;
      width: 100%;
      vertical-align: top;

      ${use === 'link'
        ? `
          display: inline;
        `
        : `
          display: inline-block;
        `}

      ${(active || checked) && !(use === 'link' || disabled)
        ? `
          ${buttonActiveCaptionMixin()}
        `
        : ``}
    `;
  },

  wrap(t: Theme, p: ButtonStylesProps) {
    const { arrow, use } = p;
    return css`
      box-sizing: border-box;
      display: inline-block;

      ${use !== 'link'
        ? `
        padding: ${t.btnWrapPadding};

        ${
          arrow === true
            ? `
              margin-right: 10px
            `
            : ``
        };

        ${
          arrow === 'left'
            ? `
              margin-left: 10px
            `
            : ``
        };

        `
        : ``}
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

  arrow() {
    return css`
      position: absolute;
      border-radius: 2px 2px 2px 16px;
      box-sizing: border-box;
      z-index: 1;
    `;
  },

  icon(t: Theme, p: ButtonStylesProps) {
    const { use, size } = p;
    return css`
      display: inline-block;

      ${size === 'small' ? styles.iconSmall(t, p) : ``}
      ${size === 'medium' ? styles.iconMedium(t, p) : ``}
      ${size === 'large' ? styles.iconLarge(t, p) : ``}

      ${
        use === 'link'
          ? `
            padding-right: ${t.btnLinkIconMarginRight};
          `
          : ``
      }
    `;
  },

  iconSmall(t: Theme, p: ButtonStylesProps) {
    return css`
      ${buttonIconSizeMixin(t.btnIconSizeSmall, t.btnIconGapSmall)}
    `;
  },

  iconMedium(t: Theme, p: ButtonStylesProps) {
    return css`
      ${buttonIconSizeMixin(t.btnIconSizeMedium, t.btnIconGapMedium)}
    `;
  },

  iconLarge(t: Theme, p: ButtonStylesProps) {
    return css`
      ${buttonIconSizeMixin(t.btnIconSizeLarge, t.btnIconGapLarge)}
    `;
  },

  borderless(t: Theme, p: ButtonStylesProps) {
    const { focus, disabled, loading, checked, active } = p;
    return css`
      ${!focus && !disabled && !loading && !checked && !active
        ? `
          &,
          &:hover,
          &:active {
            box-shadow: none;
          }
        `
        : ``}
    `;
  },

  loading(t: Theme, p: ButtonStylesProps) {
    const { size } = p;
    return css`
      ${size === 'small' ? styles.sizeSmallLoading(t, p) : ``}
      ${size === 'medium' ? styles.sizeMediumLoading(t, p) : ``}
      ${size === 'large' ? styles.sizeLargeLoading(t, p) : ``}
    `;
  },

  loader() {
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

export const jsStyles = styles;
