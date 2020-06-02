import { css, cssName, keyframes } from '../../lib/theming/Emotion';
// import { Theme } from '../../lib/theming/Theme';
import { resetButton, resetText } from '../../lib/styles/Mixins';

import {
  buttonUseMixin,
  buttonHoverMixin,
  buttonActiveMixin,
  buttonSizeMixin,
  buttonArrowMixin,
  buttonLoadingArrowMixin,
  c,
  buttonActiveCaptionMixin,
} from './Button.mixins';
import { ButtonStylesProps } from './Button';

const btn_loading_arrow = keyframes`
0% {
  transform: translateX(50px) rotate(-44.3deg);
}

100% {
  transform: translateX(21px) translateY(30px) rotate(-44.3deg);
}
`;

const styles = {
  root(s: ButtonStylesProps) {
    const { theme: t, isEdgeOrIE } = s;
    return css`
      ${resetButton()};
      ${resetText()};

      background-clip: border-box;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      color: ${t.textColorDefault};
      cursor: pointer;
      display: inline-block;
      position: relative;
      text-align: center;
      width: 100%;
      border-radius: ${t.btnBorderRadius};

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

      &:active ${cssName(styles.caption(s))} {
        ${buttonActiveCaptionMixin(s)}
      }

      ${isEdgeOrIE &&
        `
        line-height: normal;
      `}
    `;
  },

  warning(s: ButtonStylesProps) {
    const { theme: t, isLink } = s;
    return css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: ${c(`0`, isLink && `-2px`)};
      right: ${c(`0`, isLink && `-2px`)};
      bottom: ${c(`0`, isLink && `-2px`)};
      box-shadow: ${c(`0 0 0 2px ${t.borderColorWarning}`, isLink && `none`)};
    `;
  },

  error(s: ButtonStylesProps) {
    const { theme: t, isLink } = s;
    return css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      left: ${c(`0`, isLink && `-2px`)};
      right: ${c(`0`, isLink && `-2px`)};
      bottom: ${c(`0`, isLink && `-2px`)};
      box-shadow: ${c(`0 0 0 2px ${t.borderColorError}`, isLink && `none`)};

      ${isLink &&
        `
        background: ${t.errorSecondary};
      `}
    `;
  },

  sizeSmall(s: ButtonStylesProps) {
    const { theme: t, isLoading } = s;
    return css`
      border-radius: ${t.btnSmallBorderRadius};

      ${buttonSizeMixin(
        s,
        t.btnFontSizeSmall,
        t.controlHeightSmall,
        t.btnHeightShift,
        t.controlLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
      )};

      ${cssName(styles.arrow(s))} {
        border-radius: ${t.btnSmallArrowBorderRadius};
      }

      ${buttonArrowMixin(
        s,
        t.btnSmallArrowTop,
        t.btnSmallArrowLeft,
        t.btnSmallArrowRight,
        t.btnSmallArrowLength,
        'rotate(53deg) skewX(24deg) skewY(10deg)',
        cssName(styles.arrow(s)),
      )};

      ${isLoading
        ? buttonLoadingArrowMixin(
            s,
            t.btnSmallArrowTop,
            t.btnSmallArrowTop,
            '-207px',
            '441%',
            t.btnSmallArrowBg,
            t.btnSmallArrowLeftLoadingDelay,
            btn_loading_arrow,
            cssName(styles.arrow(s)),
          )
        : ``}
    `;
  },

  sizeMedium(s: ButtonStylesProps) {
    const { theme: t, isLoading } = s;
    return css`
      ${buttonSizeMixin(
        s,
        t.btnFontSizeMedium,
        t.controlHeightMedium,
        t.btnHeightShift,
        t.controlLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
      )};

      ${buttonArrowMixin(
        s,
        '9px',
        t.btnMediumArrowLeft,
        t.btnMediumArrowRight,
        '20.2px',
        t.btnMediumArrowTransform,
        cssName(styles.arrow(s)),
      )};

      ${
        isLoading
          ? buttonLoadingArrowMixin(
              s,
              '0',
              '0',
              t.btnMediumArrowLeftLoadingLeft,
              '441%',
              t.btnMediumArrowBg,
              t.btnMediumArrowLeftLoadingDelay,
              btn_loading_arrow,
              cssName(styles.arrow(s)),
            )
          : ``
      }
    }
    `;
  },

  sizeLarge(s: ButtonStylesProps) {
    const { theme: t, isLoading } = s;
    return css`
      ${buttonSizeMixin(
        s,
        t.btnFontSizeLarge,
        t.controlHeightLarge,
        t.btnHeightShift,
        t.controlLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
      )};

      ${buttonArrowMixin(
        s,
        '10.2px',
        t.btnLargeArrowLeft,
        '-10.8px',
        '22.2px',
        t.btnLargeArrowTransform,
        cssName(styles.arrow(s)),
      )};

      ${isLoading
        ? buttonLoadingArrowMixin(
            s,
            '-32px',
            '-36px',
            ' -198px',
            '700%',
            t.btnLargeArrowBg,
            t.btnLargeArrowLeftLoadingDelay,
            btn_loading_arrow,
            cssName(styles.arrow(s)),
          )
        : ``}
    `;
  },

  link(s: ButtonStylesProps) {
    const { theme: t, isFocused, isDisabled, isEdgeOrIE } = s;
    return css`
      background: none;
      border-radius: ${t.btnLinkBorderRadius};
      border: none;
      box-shadow: none;
      color: ${c(t.linkColor, isDisabled && t.linkDisabledColor)};
      display: inline;
      line-height: ${c(`inherit`, isEdgeOrIE && `normal`)};
      margin: 0;
      padding: 0;

      &:hover {
        color: ${c(!isFocused && t.linkHoverColor)};
        text-decoration: ${t.linkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkActiveColor};
      }
      ${isFocused &&
        `
        color: ${t.linkColor};
        text-decoration: ${t.linkHoverTextDecoration};
      `}
    `;
  },

  focus(s: ButtonStylesProps) {
    const { theme: t, isDisabled, isWarning, isError, isLink } = s;
    return css`
      position: relative;
      z-index: 2;

      ${!isDisabled &&
        !isLink &&
        `
        border: ${t.btnFocusBorder};

        &,
        &:hover,
        &:active {
          box-shadow: ${c(
            `inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus}`,
            (isWarning || isError) && `inset 0 0 0 1px ${t.outlineColorFocus}`,
          )};
          border-color: ${c((isWarning || isError) && `transparent`)};
        }
      `}
    `;
  },

  disabled(s: ButtonStylesProps) {
    const { theme: t, isLink, isEdgeOrIE } = s;
    return css`
      cursor: default;
      pointer-events: none;
      border-color: transparent;
      outline-color: ${c(isEdgeOrIE && `transparent`)};

      ${!isLink
        ? `
          background: ${t.btnDisabledBg};
          color: ${t.btnDisabledTextColor};
          box-shadow: ${t.btnDisabledShadow};

          ${cssName(styles.arrow(s))} {
            background: ${t.btnDisabledBg};
            box-shadow: ${t.btnDisabledShadowArrow};
          }
        `
        : ``}
    `;
  },

  default(s: ButtonStylesProps) {
    const { theme: t } = s;
    return css`
      ${buttonUseMixin(
        s,
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
        cssName(styles.arrow(s)),
      )};

      ${buttonHoverMixin(
        s,
        t.btnDefaultHoverBg,
        t.btnDefaultHoverBgStart,
        t.btnDefaultHoverBgEnd,
        t.btnDefaultHoverBgStart,
        t.btnDefaultHoverBgEnd,
        t.btnDefaultHoverShadow,
        t.btnDefaultHoverShadowArrow,
        t.btnDefaultHoverShadowArrowLeft,
        t.btnDefaultHoverBorderColor,
        cssName(styles.arrow(s)),
      )};

      ${buttonActiveMixin(
        s,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveShadow,
        t.btnDefaultActiveShadowArrow,
        t.btnDefaultActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
      )};
    `;
  },

  primary(s: ButtonStylesProps) {
    const { theme: t } = s;
    return css`
      ${buttonUseMixin(
        s,
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
        cssName(styles.arrow(s)),
      )};

      ${buttonHoverMixin(
        s,
        t.btnPrimaryHoverBg,
        t.btnPrimaryHoverBgStart,
        t.btnPrimaryHoverBgEnd,
        t.btnPrimaryHoverBgStart,
        t.btnPrimaryHoverBgEnd,
        t.btnPrimaryHoverShadow,
        t.btnPrimaryHoverShadowArrow,
        t.btnPrimaryHoverShadowArrowLeft,
        t.btnPrimaryHoverBorderColor,
        cssName(styles.arrow(s)),
      )};

      ${buttonActiveMixin(
        s,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveShadow,
        t.btnPrimaryActiveShadowArrow,
        t.btnPrimaryActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
      )};
    `;
  },

  success(s: ButtonStylesProps) {
    const { theme: t } = s;
    return css`
      ${buttonUseMixin(
        s,
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
        cssName(styles.arrow(s)),
      )};

      ${buttonHoverMixin(
        s,
        t.btnSuccessHoverBg,
        t.btnSuccessHoverBgStart,
        t.btnSuccessHoverBgEnd,
        t.btnSuccessHoverBgStart,
        t.btnSuccessHoverBgEnd,
        t.btnSuccessHoverShadow,
        t.btnSuccessHoverShadowArrow,
        t.btnSuccessHoverShadowArrowLeft,
        t.btnSuccessHoverBorderColor,
        cssName(styles.arrow(s)),
      )};

      ${buttonActiveMixin(
        s,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveShadow,
        t.btnSuccessActiveShadowArrow,
        t.btnSuccessActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
      )};
    `;
  },

  danger(s: ButtonStylesProps) {
    const { theme: t } = s;
    return css`
      ${buttonUseMixin(
        s,
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
        cssName(styles.arrow(s)),
      )};

      ${buttonHoverMixin(
        s,
        t.btnDangerHoverBg,
        t.btnDangerHoverBgStart,
        t.btnDangerHoverBgEnd,
        t.btnDangerHoverBgStart,
        t.btnDangerHoverBgEnd,
        t.btnDangerHoverShadow,
        t.btnDangerHoverShadowArrow,
        t.btnDangerHoverShadowArrowLeft,
        t.btnDangerHoverBorderColor,
        cssName(styles.arrow(s)),
      )};

      ${buttonActiveMixin(
        s,
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveShadow,
        t.btnDangerActiveShadowArrow,
        t.btnDangerActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
      )};
    `;
  },

  pay(s: ButtonStylesProps) {
    const { theme: t } = s;
    return css`
      ${buttonUseMixin(
        s,
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
        cssName(styles.arrow(s)),
      )};

      ${buttonHoverMixin(
        s,
        t.btnPayHoverBg,
        t.btnPayHoverBgStart,
        t.btnPayHoverBgEnd,
        t.btnPayHoverBgStart,
        t.btnPayHoverBgEnd,
        t.btnPayHoverShadow,
        t.btnPayHoverShadowArrow,
        t.btnPayHoverShadowArrowLeft,
        t.btnPayHoverBorderColor,
        cssName(styles.arrow(s)),
      )};

      ${buttonActiveMixin(
        s,
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveShadow,
        t.btnPayActiveShadowArrow,
        t.btnPayActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
      )};
    `;
  },

  checked(s: ButtonStylesProps) {
    const { theme: t, isFocused, isArrowLeft } = s;
    return css`
      &,
      &:hover,
      &:active {
        box-shadow: ${t.btnCheckedShadow};
        background: ${t.btnCheckedBg};
        color: ${t.btnCheckedTextColor};
        border: ${t.btnDefaultCheckedBorder};

        ${!isFocused
          ? `
            ${cssName(styles.arrow(s))} {
              background: ${t.btnCheckedBg};
              box-shadow: ${c(t.btnCheckedShadowArrow, isArrowLeft && t.btnCheckedShadowArrowLeft)};
            }
          `
          : ``}
      }
    `;
  },

  caption(s: ButtonStylesProps) {
    const { isLink, isActive, isChecked } = s;
    return css`
      position: relative;
      white-space: nowrap;
      display: ${c(`inline-block`, isLink && `inline`)};
      width: 100%;
      vertical-align: top;

      ${isActive || isChecked ? buttonActiveCaptionMixin(s) : ``}
    `;
  },

  wrap(s: ButtonStylesProps) {
    const { theme: t, isLink } = s;
    return css`
      padding: ${c(t.btnWrapPadding, isLink && `0`)};
      box-sizing: border-box;
      display: inline-block;
    `;
  },

  narrow(s: ButtonStylesProps) {
    return css`
      padding-left: 5px;
      padding-right: 5px;
    `;
  },

  noPadding(s: ButtonStylesProps) {
    return css`
      padding-left: 0;
      padding-right: 0;
    `;
  },

  noRightPadding(s: ButtonStylesProps) {
    return css`
      padding-right: 0;
    `;
  },

  wrapArrow(s: ButtonStylesProps) {
    const { isArrowLeft } = s;
    return css`
      margin-left: ${isArrowLeft ? `10px` : `0px`};
      margin-right: ${isArrowLeft ? `0px` : `10px`};
    `;
  },

  arrow(s: ButtonStylesProps) {
    return css`
      position: absolute;
      border-radius: 2px 2px 2px 16px;
      box-sizing: border-box;
      z-index: 1;
    `;
  },

  icon(s: ButtonStylesProps) {
    const { theme: t, isLink } = s;
    return css`
      display: inline-block;
      padding-right: ${c(`7px`, isLink && t.linkIconMarginRight)};
    `;
  },

  buttonWithIcon(s: ButtonStylesProps) {
    return css`
      padding-right: 15px;
      padding-left: 15px;
    `;
  },

  borderless(s: ButtonStylesProps) {
    const { isFocused, isDisabled, isChecked, isActive, isLoading } = s;
    return !isFocused && !isDisabled && !isChecked && !isActive && !isLoading
      ? css`
          &,
          &:hover,
          &:active {
            box-shadow: none;
          }
        `
      : ``;
  },

  loading(s: ButtonStylesProps) {
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
