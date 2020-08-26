import { css, cssName, keyframes /* memoizeStyle */ } from '../../lib/theming/Emotion';
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
import { ButtonProps } from './Button';

const btn_loading_arrow = keyframes`
0% {
  transform: translateX(50px) rotate(-44.3deg);
}

100% {
  transform: translateX(21px) translateY(30px) rotate(-44.3deg);
}
`;

// ${use === 'default' && styles.default(t)}
// ${use === 'primary' && styles.primary(t)}
// ${use === 'success' && styles.success(t)}
// ${use === 'danger' && styles.danger(t)}
// ${use === 'pay' && styles.pay(t)}
// ${use === 'link' && styles.link(p)}

// ${size === 'small' && styles.sizeSmall(t)}
// ${size === 'medium' && styles.sizeMedium(t)}
// ${size === 'large' && styles.sizeLarge(t)}

export interface ButtonStylesProps {
  t: Theme;
  size: NonNullable<ButtonProps['size']>;
  use: NonNullable<ButtonProps['use']>;
  focus: boolean;
  active: boolean;
  disabled: boolean;
  checked: boolean;
  narrow: boolean;
  noPadding: boolean;
  noRightPadding: boolean;
  borderless: boolean;
  error: boolean;
  warning: boolean;
  arrow: NonNullable<ButtonProps['arrow']>;
}

const styles = {
  root({ t, use, size }: ButtonStylesProps) {
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

      &:active {
        ${cssName(styles.caption())} {
          transform: translateY(1px);
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
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning};
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
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError};
    `;
  },

  sizeSmall(p: ButtonStylesProps) {
    const { t, arrow } = p;
    return css`
      border-radius: ${t.btnBorderRadiusSmall};

      ${buttonSizeMixin(
        t.btnFontSizeSmall,
        t.btnHeightSmall,
        t.btnHeightShift,
        t.btnLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        cssName(styles.link(p)),
        cssName(styles.fallback(p)),
      )};

      ${cssName(styles.arrow(p))} {
        border-radius: ${t.btnSmallArrowBorderRadius};
      }

      ${buttonArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowLeft,
        t.btnSmallArrowRight,
        t.btnSmallArrowLength,
        'rotate(53deg) skewX(24deg) skewY(10deg)',
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  sizeMedium(p: ButtonStylesProps) {
    const { t, arrow } = p;
    return css`
      border-radius: ${t.btnBorderRadiusMedium};

      ${buttonSizeMixin(
        t.btnFontSizeMedium,
        t.btnHeightMedium,
        t.btnHeightShift,
        t.btnLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        cssName(styles.link(p)),
        cssName(styles.fallback(p)),
      )};

      ${buttonArrowMixin(
        t.btnMediumArrowTop,
        t.btnMediumArrowLeft,
        t.btnMediumArrowRight,
        t.btnMediumArrowLength,
        t.btnMediumArrowTransform,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  sizeLarge(p: ButtonStylesProps) {
    const { t, arrow } = p;
    return css`
      border-radius: ${t.btnBorderRadiusLarge};

      ${buttonSizeMixin(
        t.btnFontSizeLarge,
        t.btnHeightLarge,
        t.btnHeightShift,
        t.btnLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        cssName(styles.link(p)),
        cssName(styles.fallback(p)),
      )};

      ${buttonArrowMixin(
        t.btnLargeArrowTop,
        t.btnLargeArrowLeft,
        t.btnLargeArrowRight,
        t.btnLargeArrowLength,
        t.btnLargeArrowTransform,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  sizeSmallLoading(p: ButtonStylesProps) {
    const { t, arrow } = p;
    return css`
      ${buttonLoadingArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowTop,
        '-207px',
        '441%',
        t.btnSmallArrowBg,
        t.btnSmallArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  sizeMediumLoading(p: ButtonStylesProps) {
    const { t, arrow } = p;
    return css`
      ${buttonLoadingArrowMixin(
        '0',
        '0',
        t.btnMediumArrowLeftLoadingLeft,
        '441%',
        t.btnMediumArrowBg,
        t.btnMediumArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  sizeLargeLoading(p: ButtonStylesProps) {
    const { t, arrow } = p;
    return css`
      ${buttonLoadingArrowMixin(
        '-32px',
        '-36px',
        ' -198px',
        '700%',
        t.btnLargeArrowBg,
        t.btnLargeArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  link(p: ButtonStylesProps) {
    const { t } = p;
    return css`
      background: none;
      border-radius: ${t.btnLinkBorderRadius} !important;
      border: none;
      box-shadow: none;
      color: ${t.btnLinkColor} !important;
      display: inline;
      line-height: inherit !important;
      margin: 0;
      padding: 0 !important;

      &:hover {
        color: ${t.btnLinkHoverColor} !important;
        text-decoration: ${t.btnLinkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkActiveColor} !important;
      }
      ${cssName(styles.caption())} {
        display: inline;
        transform: none !important;
      }
      ${cssName(styles.icon())} {
        padding-right: ${t.btnLinkIconMarginRight};
      }
      ${cssName(styles.warning(t))} ,
      ${cssName(styles.error(t))}  {
        box-shadow: none;
        left: -2px !important;
        right: -2px !important;
        bottom: -2px !important;
      }
      ${cssName(styles.error(t))}  {
        background: ${t.btnErrorSecondary} !important;
      }
    `;
  },

  focus(p: ButtonStylesProps) {
    const { t, use, disabled, error, warning } = p;
    return css`
      position: relative;
      z-index: 2;

      ${use === 'link' &&
        `
          color: ${t.btnLinkColor};
          text-decoration: ${t.btnLinkHoverTextDecoration};
        `}

      ${use !== 'link' &&
        !disabled &&
        `
          border: ${t.btnFocusBorder};

          &,
          &:hover,
          &:active,
          ${cssName(styles.active(p))} {
            box-shadow: inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus},
              0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus};

            ${((error || warning) &&
              `
              box-shadow: inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus} !important;
              border-color: transparent !important;
            `) ||
              ''}

            ${cssName(styles.arrow(p))} {
              box-shadow: inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
                ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorFocus};

              ${warning &&
                `
              box-shadow: inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
                  ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorWarning} !important;`}

              ${error &&
                `
              box-shadow: inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
                  ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorError} !important;
              `}
            }
          }
        `}
    `;
  },

  disabled(p: ButtonStylesProps) {
    const { t, use } = p;
    return css`
      cursor: default;
      pointer-events: none;
      border-color: transparent !important;

      ${use !== 'link' &&
        `
        background: ${t.btnDisabledBg} !important;
        color: ${t.btnDisabledTextColor} !important;
        box-shadow: ${t.btnDisabledShadow} !important;

        ${cssName(styles.arrow(p))} {
          background: ${t.btnDisabledBg} !important;
          box-shadow: ${t.btnDisabledShadowArrow} !important;
        }
      `}

      ${use === 'link' &&
        `
          color: ${t.btnLinkDisabledColor} !important;
        `}

      ${cssName(styles.caption())} {
        transform: none !important;
      }
    `;
  },

  fallback(p: ButtonStylesProps) {
    const { use, disabled } = p;
    return css`
      ${disabled &&
        `
      outline-color: transparent;
      `}

      ${use !== 'link' &&
        `
      line-height: normal !important;
      `}
    `;
  },

  validationRoot(p: ButtonStylesProps) {
    const { t, focus } = p;
    return css`
      ${focus &&
        `
        box-shadow: inset 0 0 0 1px ${t.btnOutlineColorFocus} !important;
        border-color: transparent !important;
      `}
    `;
  },

  default(p: ButtonStylesProps) {
    const { t, arrow, active } = p;
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
        cssName(styles.arrow(p)),
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
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveShadow,
        t.btnDefaultActiveShadowArrow,
        t.btnDefaultActiveShadowArrowLeft,
        active,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  primary(p: ButtonStylesProps) {
    const { t, arrow, active } = p;
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
        cssName(styles.arrow(p)),
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
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveShadow,
        t.btnPrimaryActiveShadowArrow,
        t.btnPrimaryActiveShadowArrowLeft,
        active,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  success(p: ButtonStylesProps) {
    const { t, arrow, active } = p;
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
        cssName(styles.arrow(p)),
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
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveShadow,
        t.btnSuccessActiveShadowArrow,
        t.btnSuccessActiveShadowArrowLeft,
        active,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  danger(p: ButtonStylesProps) {
    const { t, arrow, active } = p;
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
        cssName(styles.arrow(p)),
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
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveShadow,
        t.btnDangerActiveShadowArrow,
        t.btnDangerActiveShadowArrowLeft,
        active,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  pay(p: ButtonStylesProps) {
    const { t, arrow, active } = p;
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
        cssName(styles.arrow(p)),
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
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};

      ${buttonActiveMixin(
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveShadow,
        t.btnPayActiveShadowArrow,
        t.btnPayActiveShadowArrowLeft,
        active,
        cssName(styles.arrow(p)),
        arrow === 'left',
      )};
    `;
  },

  checked(p: ButtonStylesProps) {
    const { t, use, disabled, arrow } = p;
    return css`
      box-shadow: ${t.btnCheckedShadow} !important;
      background: ${t.btnCheckedBg} !important;
      color: ${t.btnCheckedTextColor} !important;
      border: ${t.btnDefaultCheckedBorder} !important;

      ${use !== 'link' &&
        !disabled &&
        `
        ${cssName(styles.caption())} {
          transform: translateY(1px) !important;
        }
      `}

      ${cssName(styles.arrow(p))} {
        background: ${t.btnCheckedBg} !important;
        box-shadow: ${t.btnCheckedShadowArrow} !important;

        ${arrow === 'left' &&
          `
          box-shadow: ${t.btnCheckedShadowArrowLeft} !important;
        `}
      }
    `;
  },

  active({ use, disabled }: ButtonStylesProps) {
    return css`
      ${use !== 'link' &&
        !disabled &&
        `
        ${cssName(styles.caption())} {
          transform: translateY(1px) !important;
        }
      `}
    `;
  },

  caption() {
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
      ${styles.wrap(t)};

      padding: 0;
    `;
  },

  wrapArrow() {
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

  arrow({ t, error, warning }: ButtonStylesProps) {
    return css`
      position: absolute;
      border-radius: 2px 2px 2px 16px;
      box-sizing: border-box;
      z-index: 1;

      ${error &&
        `
        box-shadow: ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorError} !important;
      `}

      ${warning &&
        `
        box-shadow: ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorWarning} !important;
      `}
    `;
  },

  icon() {
    return css`
      display: inline-block;
    `;
  },
  iconSmall(t: Theme) {
    return css`
      width: ${t.btnIconSizeSmall};
      padding-right: ${t.btnIconGapSmall};
    `;
  },
  iconMedium(t: Theme) {
    return css`
      width: ${t.btnIconSizeMedium};
      padding-right: ${t.btnIconGapMedium};
    `;
  },
  iconLarge(t: Theme) {
    return css`
      width: ${t.btnIconSizeLarge};
      padding-right: ${t.btnIconGapLarge};
    `;
  },

  borderless({ focus, disabled, checked, active }: ButtonStylesProps) {
    return css`
      ${!focus &&
        !disabled &&
        !checked &&
        !active &&
        `
        &,
        &:hover,
        &:active {
          box-shadow: none !important;
        }
      `}
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

export const jsStyles = styles;
