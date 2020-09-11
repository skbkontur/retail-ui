import { css, cssName, keyframes, memoizeStyle } from '../../lib/theming/Emotion';
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

const styles = {
  root(
    t: Theme,
    use: ButtonProps['use'],
    size: ButtonProps['size'],
    error: ButtonProps['error'],
    warning: ButtonProps['warning'],
    active: ButtonProps['active'],
    borderless: ButtonProps['borderless'],
    checked: ButtonProps['checked'],
    disabled: ButtonProps['disabled'],
    loading: ButtonProps['loading'],
    narrow: ButtonProps['narrow'],
    noPadding: ButtonProps['_noPadding'],
    noRightPadding: ButtonProps['_noRightPadding'],
    arrow: ButtonProps['arrow'],
    focus: boolean,
  ) {
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

      ${size === 'small' ? styles.sizeSmall(t, use, arrow) : ``}
      ${size === 'medium' ? styles.sizeMedium(t, use, arrow) : ``}
      ${size === 'large' ? styles.sizeLarge(t, use, arrow) : ``}

      ${
        use === 'link'
          ? css`
              ${styles.link(t, disabled, focus)}
            `
          : css`
            ${use === 'default' ? styles.default(t, arrow, active) : ``}
            ${use === 'primary' ? styles.primary(t, arrow, active) : ``}
            ${use === 'success' ? styles.success(t, arrow, active) : ``}
            ${use === 'danger' ? styles.danger(t, arrow, active) : ``}
            ${use === 'pay' ? styles.pay(t, arrow, active) : ``}

            ${error ? styles.error(t) : ``}
            ${warning ? styles.warning(t) : ``}

            ${focus ? styles.focus(t, disabled, error, warning) : ``}
            ${checked ? styles.checked(t, arrow) : ``}
            ${disabled || loading ? styles.disabled(t) : ``}
            ${loading ? styles.loading(t, size, arrow) : ``}

            ${narrow ? styles.narrow() : ``}
            ${noPadding ? styles.noPadding() : ``}
            ${noRightPadding ? styles.noRightPadding() : ``}
            ${borderless ? styles.borderless(t, focus, disabled, loading, checked, active) : ``}

            &:active {
              ${cssName(styles.caption(t, use, active, checked, disabled))} {
                ${buttonActiveCaptionMixin()}
              }
            }
          `
      }
    `;
  },

  outline(t: Theme, use: ButtonProps['use'], error: ButtonProps['error'], warning: ButtonProps['warning']) {
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

  sizeSmall(t: Theme, use: ButtonProps['use'], arrow: ButtonProps['arrow']) {
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

  sizeMedium(t: Theme, use: ButtonProps['use'], arrow: ButtonProps['arrow']) {
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

  sizeLarge(t: Theme, use: ButtonProps['use'], arrow: ButtonProps['arrow']) {
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

  sizeSmallLoading(t: Theme, arrow: ButtonProps['arrow']) {
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

  sizeMediumLoading(t: Theme, arrow: ButtonProps['arrow']) {
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

  sizeLargeLoading(t: Theme, arrow: ButtonProps['arrow']) {
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

  link(t: Theme, disabled: ButtonProps['disabled'], focus: boolean) {
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

  focus(t: Theme, disabled: ButtonProps['disabled'], error: ButtonProps['error'], warning: ButtonProps['warning']) {
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

  disabled(t: Theme) {
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

  error(t: Theme) {
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

  warning(t: Theme) {
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

  default(t: Theme, arrow: ButtonProps['arrow'], active: ButtonProps['active']) {
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

  primary(t: Theme, arrow: ButtonProps['arrow'], active: ButtonProps['active']) {
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

  success(t: Theme, arrow: ButtonProps['arrow'], active: ButtonProps['active']) {
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

  danger(t: Theme, arrow: ButtonProps['arrow'], active: ButtonProps['active']) {
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

  pay(t: Theme, arrow: ButtonProps['arrow'], active: ButtonProps['active']) {
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

  checked(t: Theme, arrow: ButtonProps['arrow']) {
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

  caption(
    t: Theme,
    use: ButtonProps['use'],
    active: ButtonProps['active'],
    checked: ButtonProps['checked'],
    disabled: ButtonProps['disabled'],
  ) {
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

  wrap(t: Theme, arrow: ButtonProps['arrow'], use: ButtonProps['use']) {
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

  icon(t: Theme, use: ButtonProps['use'], size: ButtonProps['size']) {
    return css`
      display: inline-block;

      ${size === 'small' ? styles.iconSmall(t) : ``}
      ${size === 'medium' ? styles.iconMedium(t) : ``}
      ${size === 'large' ? styles.iconLarge(t) : ``}

      ${
        use === 'link'
          ? `
            padding-right: ${t.btnLinkIconMarginRight};
          `
          : ``
      }
    `;
  },

  iconSmall(t: Theme) {
    return css`
      ${buttonIconSizeMixin(t.btnIconSizeSmall, t.btnIconGapSmall)}
    `;
  },

  iconMedium(t: Theme) {
    return css`
      ${buttonIconSizeMixin(t.btnIconSizeMedium, t.btnIconGapMedium)}
    `;
  },

  iconLarge(t: Theme) {
    return css`
      ${buttonIconSizeMixin(t.btnIconSizeLarge, t.btnIconGapLarge)}
    `;
  },

  borderless(
    t: Theme,
    focus: boolean,
    disabled: ButtonProps['disabled'],
    loading: ButtonProps['loading'],
    checked: ButtonProps['checked'],
    active: ButtonProps['active'],
  ) {
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

  loading(t: Theme, size: ButtonProps['size'], arrow: ButtonProps['arrow']) {
    return css`
      ${size === 'small' ? styles.sizeSmallLoading(t, arrow) : ``}
      ${size === 'medium' ? styles.sizeMediumLoading(t, arrow) : ``}
      ${size === 'large' ? styles.sizeLargeLoading(t, arrow) : ``}
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

export const jsStyles = memoizeStyle(styles);
