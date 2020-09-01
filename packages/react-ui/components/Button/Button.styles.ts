import { css, cssName, keyframes /* memoizeStyle */ } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';
import { isIE11, isEdge } from '../../lib/utils';
import { shift } from '../../lib/styles/DimensionFunctions';

import {
  buttonIconSizeMixin,
  buttonLoadingArrowMixin,
  getBtnPadding,
  getBtnUseBg,
  getBtnArrowUseBg,
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

function match<R>(cases: Array<[boolean, R]>): R;
function match<R, D>(cases: Array<[boolean, R]>, defaultResult: D): R | D;
function match(cases: any, defaultResult?: any) {
  for (const [condition, result] of cases) {
    if (condition) return result;
  }
  return defaultResult;
}

const bySize = <T>(size: ButtonProps['size'], [small, medium, large]: T[]) => {
  switch (size) {
    case 'large':
      return large;
    case 'medium':
      return medium;
    case 'small':
    default:
      return small;
  }
};

export interface ButtonStylesProps extends ButtonProps {
  focus: boolean;
  hover: boolean;
}

const styles = {
  root(t: Theme, p: ButtonStylesProps) {
    const {
      use,
      size,
      error,
      warning,
      borderless,
      active,
      hover,
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
      position: relative;
      text-align: center;
      width: 100%;
      box-sizing: border-box;

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

      display: ${use === 'link' ? 'inline' : 'inline-block'};
      cursor: ${disabled ? 'default' : 'pointer'};
      pointer-events: ${match([[disabled === true, 'none']])};
      z-index: ${match([[focus === true, '2']])};

      text-decoration: ${match([
        [
          use === 'link',
          match([
            [focus === true, t.btnLinkHoverTextDecoration],
            [hover === true, t.btnLinkHoverTextDecoration],
          ]),
        ],
      ])};

      font-size: ${bySize(size, [t.btnFontSizeSmall, t.btnFontSizeMedium, t.btnFontSizeLarge])};

      height: ${match([
        [
          use !== 'link',
          shift(
            match([
              [size === 'small', t.btnHeightSmall],
              [size === 'medium', t.btnHeightMedium],
              [size === 'large', t.btnHeightLarge],
            ]),
            t.btnHeightShift,
          ),
        ],
      ])};

      padding: ${
        use === 'link'
          ? '0'
          : getBtnPadding(
              match([
                [size === 'small', t.btnFontSizeSmall],
                [size === 'medium', t.btnFontSizeMedium],
                [size === 'large', t.btnFontSizeLarge],
              ]),
              match([
                [size === 'small', t.btnPaddingYSmall],
                [size === 'medium', t.btnPaddingYMedium],
                [size === 'large', t.btnPaddingYLarge],
              ]),
              match([
                [size === 'small', t.btnPaddingXSmall],
                [size === 'medium', t.btnPaddingXMedium],
                [size === 'large', t.btnPaddingXLarge],
              ]),
              isIE11 || isEdge ? 1 : 0,
            )
      };

      line-height: ${match([
        [use === 'link', 'inherit'],
        [isIE11 || isEdge, 'normal'],
        [size === 'small', t.btnLineHeightSmall],
        [size === 'medium', t.btnLineHeightMedium],
        [size === 'large', t.btnLineHeightLarge],
      ])};

      border-radius: ${match([
        [use === 'link', t.btnLinkBorderRadius],
        [size === 'small', t.btnBorderRadiusSmall],
        [size === 'medium', t.btnBorderRadiusMedium],
        [size === 'large', t.btnBorderRadiusLarge],
      ])};

      background: ${match([
        [use === 'link', 'none'],
        [
          active === true,
          match([
            [use === 'default', t.btnDefaultActiveBg],
            [use === 'primary', t.btnPrimaryActiveBg],
            [use === 'success', t.btnSuccessActiveBg],
            [use === 'danger', t.btnDangerActiveBg],
            [use === 'pay', t.btnPayActiveBg],
          ]),
        ],
        [
          hover === true,
          match([
            [use === 'default', getBtnUseBg(t.btnDefaultHoverBg, t.btnDefaultHoverBgStart, t.btnDefaultHoverBgEnd)],
            [use === 'primary', getBtnUseBg(t.btnPrimaryHoverBg, t.btnPrimaryHoverBgStart, t.btnPrimaryHoverBgEnd)],
            [use === 'success', getBtnUseBg(t.btnSuccessHoverBg, t.btnSuccessHoverBgStart, t.btnSuccessHoverBgEnd)],
            [use === 'danger', getBtnUseBg(t.btnDangerHoverBg, t.btnDangerHoverBgStart, t.btnDangerHoverBgEnd)],
            [use === 'pay', getBtnUseBg(t.btnPayHoverBg, t.btnPayHoverBgStart, t.btnPayHoverBgEnd)],
          ]),
        ],
        [use === 'default', getBtnUseBg(t.btnDefaultBg, t.btnDefaultBgStart, t.btnDefaultBgEnd)],
        [use === 'primary', getBtnUseBg(t.btnPrimaryBg, t.btnPrimaryBgStart, t.btnPrimaryBgEnd)],
        [use === 'success', getBtnUseBg(t.btnSuccessBg, t.btnSuccessBgStart, t.btnSuccessBgEnd)],
        [use === 'danger', getBtnUseBg(t.btnDangerBg, t.btnDangerBgStart, t.btnDangerBgEnd)],
        [use === 'pay', getBtnUseBg(t.btnPayBg, t.btnPayBgStart, t.btnPayBgEnd)],
      ])};

      color: ${match([
        [
          use === 'link',
          match(
            [
              [disabled === true, t.btnLinkDisabledColor],
              [focus === true, t.btnLinkColor],
              [active === true, t.btnLinkActiveColor],
              [hover === true, t.linkHoverColor],
            ],
            t.btnLinkColor,
          ),
        ],
        [use === 'default', t.btnDefaultTextColor],
        [use === 'primary', t.btnPrimaryTextColor],
        [use === 'success', t.btnSuccessTextColor],
        [use === 'danger', t.btnDangerTextColor],
        [use === 'pay', t.btnPayTextColor],
      ])};

      box-shadow: ${match([
        [use === 'link', 'none'],
        [
          focus === true && !disabled,
          match(
            [[error === true || warning === true, `inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus}`]],
            `inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.btnBorderColorFocus}`,
          ),
        ],
        [
          active === true,
          match([
            [use === 'default', t.btnDefaultActiveShadow],
            [use === 'primary', t.btnPrimaryActiveShadow],
            [use === 'success', t.btnSuccessActiveShadow],
            [use === 'danger', t.btnDangerActiveShadow],
            [use === 'pay', t.btnPayActiveShadow],
          ]),
        ],
        [
          hover === true,
          match([
            [use === 'default', t.btnDefaultHoverShadow],
            [use === 'primary', t.btnPrimaryHoverShadow],
            [use === 'success', t.btnSuccessHoverShadow],
            [use === 'danger', t.btnDangerHoverShadow],
            [use === 'pay', t.btnPayHoverShadow],
          ]),
        ],
        [use === 'default', t.btnDefaultShadow],
        [use === 'primary', t.btnPrimaryShadow],
        [use === 'success', t.btnSuccessShadow],
        [use === 'danger', t.btnDangerShadow],
        [use === 'pay', t.btnPayShadow],
      ])};

      border: ${match([
        [use === 'link', 'none'],
        [focus === true && !disabled, t.btnFocusBorder],
        [use === 'default', t.btnDefaultBorder],
        [use === 'primary', t.btnPrimaryBorder],
        [use === 'success', t.btnSuccessBorder],
        [use === 'danger', t.btnDangerBorder],
        [use === 'pay', t.btnPayBorder],
      ])};

      border-color: ${match([
        [focus === true && !disabled, 'transparent'],
        [
          hover === true,
          match([
            [use === 'default', t.btnDefaultHoverBorderColor],
            [use === 'primary', t.btnPrimaryHoverBorderColor],
            [use === 'success', t.btnSuccessHoverBorderColor],
            [use === 'danger', t.btnDangerHoverBorderColor],
            [use === 'pay', t.btnPayHoverBorderColor],
          ]),
        ],
      ])};

      ${checked ? styles.checked(t, p) : ``}
      ${disabled || loading ? styles.disabled(t, p) : ``}
      ${loading ? styles.loading(t, p) : ``}

      ${narrow ? styles.narrow() : ``}
      ${_noPadding ? styles.noPadding() : ``}
      ${_noRightPadding ? styles.noRightPadding() : ``}
      ${borderless ? styles.borderless(t, p) : ``}
    `;
  },

  outline(t: Theme, { use, error, warning }: ButtonStylesProps) {
    return css({
      borderRadius: 'inherit',
      position: 'absolute',
      top: 0,
      left: match([[use === 'link', -2]], 0),
      right: match([[use === 'link', -2]], 0),
      bottom: match([[use === 'link', -2]], 0),
      boxShadow: match([
        [use === 'link', 'inherit'],
        [error === true, `0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError}`],
        [warning === true, `0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning}`],
      ]),
    });
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
        cssName(styles.arrow(t, p)),
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
        cssName(styles.arrow(t, p)),
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
        cssName(styles.arrow(t, p)),
        arrow === 'left',
      )};
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

      ${cssName(styles.arrow(t, p))} {
        background: ${t.btnDisabledBg};
        box-shadow: ${t.btnDisabledShadowArrow};
      }
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

        ${cssName(styles.arrow(t, p))} {
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
      display: ${use === 'link' ? 'inline' : 'inline-block'};
      transform: ${match([
        [(active === true || checked === true) && !(use === 'link' || disabled === true), 'translateY(1px)'],
      ])};
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

  arrow(t: Theme, { size, arrow, use, active, hover, error, warning, focus, disabled }: ButtonStylesProps) {
    return css`
      position: absolute;
      box-sizing: border-box;
      z-index: 1;
      overflow: hidden;

      border-radius: ${size === 'small' ? t.btnSmallArrowBorderRadius : `2px 2px 2px 16px`};

      top: ${match([
        [size === 'small', t.btnSmallArrowTop],
        [size === 'medium', t.btnMediumArrowTop],
        [size === 'large', t.btnLargeArrowTop],
      ])};

      right: ${match([
        [size === 'small', t.btnSmallArrowRight],
        [size === 'medium', t.btnMediumArrowRight],
        [size === 'large', t.btnLargeArrowRight],
      ])};

      height: ${match([
        [size === 'small', t.btnSmallArrowLength],
        [size === 'medium', t.btnMediumArrowLength],
        [size === 'large', t.btnLargeArrowLength],
      ])};

      width: ${match([
        [size === 'small', t.btnSmallArrowLength],
        [size === 'medium', t.btnMediumArrowLength],
        [size === 'large', t.btnLargeArrowLength],
      ])};

      transform: ${match([
        [arrow === 'left', 'rotate(232deg) skewX(25deg) skewY(8deg)'],
        [size === 'small', 'rotate(53deg) skewX(24deg) skewY(10deg)'],
        [size === 'medium', t.btnMediumArrowTransform],
        [size === 'large', t.btnLargeArrowTransform],
      ])};

      left: ${match([
        [arrow !== 'left', 'inherit'],
        [size === 'small', t.btnSmallArrowLeft],
        [size === 'medium', t.btnMediumArrowLeft],
        [size === 'large', t.btnLargeArrowLeft],
      ])};

      background: ${match([
        [
          active === true,
          match([
            [use === 'default', t.btnDefaultActiveBg],
            [use === 'primary', t.btnPrimaryActiveBg],
            [use === 'success', t.btnSuccessActiveBg],
            [use === 'danger', t.btnDangerActiveBg],
            [use === 'pay', t.btnPayActiveBg],
          ]),
        ],
        [
          hover === true,
          match([
            [use === 'default', getBtnArrowUseBg(arrow === 'left', t.btnDefaultHoverBgStart, t.btnDefaultHoverBgEnd)],
            [use === 'primary', getBtnArrowUseBg(arrow === 'left', t.btnPrimaryHoverBgStart, t.btnPrimaryHoverBgEnd)],
            [use === 'success', getBtnArrowUseBg(arrow === 'left', t.btnSuccessHoverBgStart, t.btnSuccessHoverBgEnd)],
            [use === 'danger', getBtnArrowUseBg(arrow === 'left', t.btnDangerHoverBgStart, t.btnDangerHoverBgEnd)],
            [use === 'pay', getBtnArrowUseBg(arrow === 'left', t.btnPayHoverBgStart, t.btnPayHoverBgEnd)],
          ]),
        ],
        [use === 'default', getBtnArrowUseBg(arrow === 'left', t.btnDefaultBgStart, t.btnDefaultBgEnd)],
        [use === 'primary', getBtnArrowUseBg(arrow === 'left', t.btnPrimaryBgStart, t.btnPrimaryBgEnd)],
        [use === 'success', getBtnArrowUseBg(arrow === 'left', t.btnSuccessBgStart, t.btnSuccessBgEnd)],
        [use === 'danger', getBtnArrowUseBg(arrow === 'left', t.btnDangerBgStart, t.btnDangerBgEnd)],
        [use === 'pay', getBtnArrowUseBg(arrow === 'left', t.btnPayBgStart, t.btnPayBgEnd)],
      ])};

      box-shadow: ${match([
        [
          focus === true && !disabled,
          match(
            [
              [
                error === true,
                `inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
            ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorError}`,
              ],
              [
                warning === true,
                `inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
            ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorWarning}`,
              ],
            ],
            `inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
        ${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorFocus}`,
          ),
        ],
        [error === true, `${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorError}`],
        [warning === true, `${t.btnOutlineWidth} -${t.btnOutlineWidth} 0 0 ${t.btnBorderColorWarning}`],
        [
          active === true,
          match([
            [use === 'default', arrow === 'left' ? t.btnDefaultActiveShadowArrowLeft : t.btnDefaultActiveShadowArrow],
            [use === 'primary', arrow === 'left' ? t.btnPrimaryActiveShadowArrowLeft : t.btnPrimaryActiveShadowArrow],
            [use === 'success', arrow === 'left' ? t.btnSuccessActiveShadowArrowLeft : t.btnSuccessActiveShadowArrow],
            [use === 'danger', arrow === 'left' ? t.btnDangerActiveShadowArrowLeft : t.btnDangerActiveShadowArrow],
            [use === 'pay', arrow === 'left' ? t.btnPayActiveShadowArrowLeft : t.btnPayActiveShadowArrow],
          ]),
        ],
        [
          hover === true,
          match([
            [use === 'default', arrow === 'left' ? t.btnDefaultHoverShadowArrowLeft : t.btnDefaultHoverShadowArrow],
            [use === 'primary', arrow === 'left' ? t.btnPrimaryHoverShadowArrowLeft : t.btnPrimaryHoverShadowArrow],
            [use === 'success', arrow === 'left' ? t.btnSuccessHoverShadowArrowLeft : t.btnSuccessHoverShadowArrow],
            [use === 'danger', arrow === 'left' ? t.btnDangerHoverShadowArrowLeft : t.btnDangerHoverShadowArrow],
            [use === 'pay', arrow === 'left' ? t.btnPayHoverShadowArrowLeft : t.btnPayHoverShadowArrow],
          ]),
        ],
        [use === 'default', arrow === 'left' ? t.btnDefaultShadowArrowLeft : t.btnDefaultShadowArrow],
        [use === 'primary', arrow === 'left' ? t.btnPrimaryShadowArrowLeft : t.btnPrimaryShadowArrow],
        [use === 'success', arrow === 'left' ? t.btnSuccessShadowArrowLeft : t.btnSuccessShadowArrow],
        [use === 'danger', arrow === 'left' ? t.btnDangerShadowArrowLeft : t.btnDangerShadowArrow],
        [use === 'pay', arrow === 'left' ? t.btnPayShadowArrowLeft : t.btnPayShadowArrow],
      ])};
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
