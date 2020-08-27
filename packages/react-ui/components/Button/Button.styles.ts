import { css, cssName, keyframes /* memoizeStyle */ } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';
import { isIE11, isEdge } from '../../lib/utils';

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
  loading: boolean;
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
    const { t, arrow, use } = p;
    return css`
      border-radius: ${t.btnBorderRadiusSmall};

      ${buttonSizeMixin(
        t.btnFontSizeSmall,
        t.btnHeightSmall,
        t.btnHeightShift,
        t.btnLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        use === 'link',
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
    const { t, arrow, use } = p;
    return css`
      border-radius: ${t.btnBorderRadiusMedium};

      ${buttonSizeMixin(
        t.btnFontSizeMedium,
        t.btnHeightMedium,
        t.btnHeightShift,
        t.btnLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        use === 'link',
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
    const { t, arrow, use } = p;
    return css`
      border-radius: ${t.btnBorderRadiusLarge};

      ${buttonSizeMixin(
        t.btnFontSizeLarge,
        t.btnHeightLarge,
        t.btnHeightShift,
        t.btnLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        use === 'link',
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
      ${cssName(styles.caption())} {
        display: inline;
        transform: none;
      }
      ${cssName(styles.warning(t))} ,
      ${cssName(styles.error(t))}  {
        box-shadow: none;
        left: -2px;
        right: -2px;
        bottom: -2px;
      }
      ${cssName(styles.error(t))}  {
        background: ${t.btnErrorSecondary};
      }
    `;
  },

  focus(p: ButtonStylesProps) {
    const { t, use, disabled, error, warning } = p;
    return css`
      position: relative;
      z-index: 2;

      ${use === 'link'
        ? `
          color: ${t.btnLinkColor};
          text-decoration: ${t.btnLinkHoverTextDecoration};
        `
        : ``}

      ${use !== 'link' && !disabled
        ? `
          border: ${t.btnFocusBorder};

          &,
          &:hover,
          &:active,
          ${cssName(styles.active(p))} {
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

            ${cssName(styles.arrow(p))} {
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

  disabled(p: ButtonStylesProps) {
    const { t, use } = p;
    return css`
      cursor: default;
      pointer-events: none;
      border-color: transparent;

      ${
        isIE11 || isEdge
          ? `
        outline-color: transparent;
      `
          : ``
      }

      ${
        use !== 'link'
          ? `
        background: ${t.btnDisabledBg};
        color: ${t.btnDisabledTextColor};
        box-shadow: ${t.btnDisabledShadow};

        ${cssName(styles.arrow(p))} {
          background: ${t.btnDisabledBg};
          box-shadow: ${t.btnDisabledShadowArrow};
        }
      `
          : ``
      }

      ${
        use === 'link'
          ? `
          color: ${t.btnLinkDisabledColor};
        `
          : ``
      }

      ${cssName(styles.caption())} {
        transform: none;
      }
    `;
  },

  validationRoot(p: ButtonStylesProps) {
    const { t, focus } = p;
    return css`
      ${focus
        ? `
        box-shadow: inset 0 0 0 1px ${t.btnOutlineColorFocus};
        border-color: transparent;
      `
        : ``}
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
      box-shadow: ${t.btnCheckedShadow};
      background: ${t.btnCheckedBg};
      color: ${t.btnCheckedTextColor};
      border: ${t.btnDefaultCheckedBorder};

      ${use !== 'link' && !disabled
        ? `
        ${cssName(styles.caption())} {
          transform: translateY(1px);
        }
      `
        : ``}

      ${cssName(styles.arrow(p))} {
        background: ${t.btnCheckedBg};
        box-shadow: ${t.btnCheckedShadowArrow};

        ${arrow === 'left'
          ? `
          box-shadow: ${t.btnCheckedShadowArrowLeft};
        `
          : ``}
      }
    `;
  },

  active({ use, disabled }: ButtonStylesProps) {
    return css`
      ${use !== 'link' && !disabled
        ? `
        ${cssName(styles.caption())} {
          transform: translateY(1px);
        }
      `
        : ``}
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

      ${error
        ? `
        box-shadow: ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorError};
      `
        : ``}

      ${warning
        ? `
        box-shadow: ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorWarning};
      `
        : ``}
    `;
  },

  icon(p: ButtonStylesProps) {
    const { t, use, size } = p;
    return css`
      display: inline-block;

      ${
        size === 'small'
          ? `
        width: ${t.btnIconSizeSmall};
        padding-right: ${t.btnIconGapSmall};
      `
          : ``
      }
      ${
        size === 'medium'
          ? `
        width: ${t.btnIconSizeMedium};
        padding-right: ${t.btnIconGapMedium};
      `
          : ``
      }
      ${
        size === 'large'
          ? `
        width: ${t.btnIconSizeLarge};
        padding-right: ${t.btnIconGapLarge};
      `
          : ``
      }
      ${
        use === 'link'
          ? `
        padding-right: ${t.btnLinkIconMarginRight};
      `
          : ``
      }
    `;
  },

  borderless({ focus, disabled, loading, checked, active }: ButtonStylesProps) {
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
