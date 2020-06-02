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

const btn_loading_arrow = keyframes`
0% {
  transform: translateX(50px) rotate(-44.3deg);
}

100% {
  transform: translateX(21px) translateY(30px) rotate(-44.3deg);
}
`;

const styles = {
  root(s: any) {
    const { theme: t } = s;
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

      ${s.state.isEdgeOrIE &&
        `
        line-height: normal;
      `}
    `;
  },

  warning(s: any) {
    const { theme: t } = s;
    const isLink = s.props.use === 'link';
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

  error(s: any) {
    const { theme: t } = s;
    const isLink = s.props.use === 'link';
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

  sizeSmall(s: any) {
    const { theme: t } = s;
    return css`
      border-radius: ${t.btnSmallBorderRadius};

      ${buttonSizeMixin(
        t.btnFontSizeSmall,
        t.controlHeightSmall,
        t.btnHeightShift,
        t.controlLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        s.state.isEdgeOrIE,
        s.props.use === 'link',
      )};

      ${cssName(styles.arrow(s))} {
        border-radius: ${t.btnSmallArrowBorderRadius};
      }

      ${buttonArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowLeft,
        t.btnSmallArrowRight,
        t.btnSmallArrowLength,
        'rotate(53deg) skewX(24deg) skewY(10deg)',
        cssName(styles.arrow(s)),
        s.props.arrow === 'left',
      )};
    `;
  },

  sizeMedium(s: any) {
    const { theme: t } = s;
    return css`
      ${buttonSizeMixin(
        t.btnFontSizeMedium,
        t.controlHeightMedium,
        t.btnHeightShift,
        t.controlLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        s.state.isEdgeOrIE,
        s.props.use === 'link',
      )};

      ${buttonArrowMixin(
        '9px',
        t.btnMediumArrowLeft,
        t.btnMediumArrowRight,
        '20.2px',
        t.btnMediumArrowTransform,
        cssName(styles.arrow(s)),
        s.props.arrow === 'left',
      )};
    `;
  },

  sizeLarge(s: any) {
    const { theme: t } = s;
    return css`
      ${buttonSizeMixin(
        t.btnFontSizeLarge,
        t.controlHeightLarge,
        t.btnHeightShift,
        t.controlLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        s.state.isEdgeOrIE,
        s.props.use === 'link',
      )};

      ${buttonArrowMixin(
        '10.2px',
        t.btnLargeArrowLeft,
        '-10.8px',
        '22.2px',
        t.btnLargeArrowTransform,
        cssName(styles.arrow(s)),
        s.props.arrow === 'left',
      )};
    `;
  },

  sizeSmallLoading(s: any) {
    const { theme: t } = s;
    return css`
      ${buttonLoadingArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowTop,
        '-207px',
        '441%',
        t.btnSmallArrowBg,
        t.btnSmallArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(styles.arrow(s)),
        s.props.arrow === 'left',
      )};
    `;
  },

  sizeMediumLoading(s: any) {
    const { theme: t } = s;
    return css`
      ${buttonLoadingArrowMixin(
        '0',
        '0',
        t.btnMediumArrowLeftLoadingLeft,
        '441%',
        t.btnMediumArrowBg,
        t.btnMediumArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(styles.arrow(s)),
        s.props.arrow === 'left',
      )};
    `;
  },

  sizeLargeLoading(s: any) {
    const { theme: t } = s;
    return css`
      ${buttonLoadingArrowMixin(
        '-32px',
        '-36px',
        ' -198px',
        '700%',
        t.btnLargeArrowBg,
        t.btnLargeArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(styles.arrow(s)),
        s.props.arrow === 'left',
      )};
    `;
  },

  link(s: any) {
    const { theme: t } = s;
    const { focusedByTab, isEdgeOrIE } = s.state;
    const { disabled, visuallyFocused } = s.props;
    const focus = focusedByTab || !!visuallyFocused;
    return css`
      background: none;
      border-radius: ${t.btnLinkBorderRadius};
      border: none;
      box-shadow: none;
      color: ${c(t.linkColor, disabled && t.linkDisabledColor)};
      display: inline;
      line-height: ${c(`inherit`, isEdgeOrIE && `normal`)};
      margin: 0;
      padding: 0;

      &:hover {
        color: ${c(!focus && t.linkHoverColor)};
        text-decoration: ${t.linkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkActiveColor};
      }
      ${focus &&
        `
        color: ${t.linkColor};
        text-decoration: ${t.linkHoverTextDecoration};
      `}
    `;
  },

  focus(s: any) {
    const { theme: t } = s;
    const { disabled, warning, use, error } = s.props;
    const link = use === 'link';
    return css`
      position: relative;
      z-index: 2;

      ${!disabled &&
        !link &&
        `
        border: ${t.btnFocusBorder};

        &,
        &:hover,
        &:active {
          box-shadow: ${c(
            `inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus}`,
            (warning || error) && `inset 0 0 0 1px ${t.outlineColorFocus}`,
          )};
          border-color: ${c((warning || error) && `transparent`)};
        }
      `}
    `;
  },

  disabled(s: any) {
    const { theme: t } = s;
    const link = s.props.use === 'link';
    const { isEdgeOrIE } = s.state;
    return css`
      cursor: default;
      pointer-events: none;
      border-color: transparent;
      outline-color: ${c(isEdgeOrIE && `transparent`)};

      ${!link &&
        `
        background: ${t.btnDisabledBg};
        color: ${t.btnDisabledTextColor};
        box-shadow: ${t.btnDisabledShadow};

        ${cssName(styles.arrow(s))} {
          background: ${t.btnDisabledBg};
          box-shadow: ${t.btnDisabledShadowArrow};
        }
      `}
    `;
  },

  default(s: any) {
    const { theme: t } = s;
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
        s.props.checked,
        cssName(styles.arrow(s)),
        s,
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
        cssName(styles.arrow(s)),
        s,
      )};

      ${buttonActiveMixin(
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveShadow,
        t.btnDefaultActiveShadowArrow,
        t.btnDefaultActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
        s,
      )};
    `;
  },

  primary(s: any) {
    const { theme: t } = s;
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
        s.props.checked,
        cssName(styles.arrow(s)),
        s,
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
        cssName(styles.arrow(s)),
        s,
      )};

      ${buttonActiveMixin(
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveShadow,
        t.btnPrimaryActiveShadowArrow,
        t.btnPrimaryActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
        s,
      )};
    `;
  },

  success(s: any) {
    const { theme: t } = s;
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
        s.props.checked,
        cssName(styles.arrow(s)),
        s,
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
        cssName(styles.arrow(s)),
        s,
      )};

      ${buttonActiveMixin(
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveShadow,
        t.btnSuccessActiveShadowArrow,
        t.btnSuccessActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
        s,
      )};
    `;
  },

  danger(s: any) {
    const { theme: t } = s;
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
        s.props.checked,
        cssName(styles.arrow(s)),
        s,
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
        cssName(styles.arrow(s)),
        s,
      )};

      ${buttonActiveMixin(
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveShadow,
        t.btnDangerActiveShadowArrow,
        t.btnDangerActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
        s,
      )};
    `;
  },

  pay(s: any) {
    const { theme: t } = s;
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
        s.props.checked,
        cssName(styles.arrow(s)),
        s,
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
        cssName(styles.arrow(s)),
        s,
      )};

      ${buttonActiveMixin(
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveShadow,
        t.btnPayActiveShadowArrow,
        t.btnPayActiveShadowArrowLeft,
        cssName(styles.arrow(s)),
        s,
      )};
    `;
  },

  checked(s: any) {
    const { theme: t } = s;
    const focus = s.state.focusedByTab || !!s.props.visuallyFocused;
    const isArrowLeft = s.props.arrow === 'left';
    return css`
      &,
      &:hover,
      &:active {
        box-shadow: ${t.btnCheckedShadow};
        background: ${t.btnCheckedBg};
        color: ${t.btnCheckedTextColor};
        border: ${t.btnDefaultCheckedBorder};

        ${!focus &&
          `
          ${cssName(styles.arrow(s))} {
            background: ${t.btnCheckedBg};
            box-shadow: ${c(t.btnCheckedShadowArrow, isArrowLeft && t.btnCheckedShadowArrowLeft)};
          }
        `}
      }
    `;
  },

  caption(s: any) {
    const link = s.props.use === 'link';
    return css`
      position: relative;
      white-space: nowrap;
      display: ${c(`inline-block`, link && `inline`)};
      width: 100%;
      vertical-align: top;

      ${s.props.active || s.props.checked ? buttonActiveCaptionMixin(s) : ``}
    `;
  },

  wrap(s: any) {
    const { theme: t } = s;
    const isLink = s.props.use === 'link';
    return css`
      padding: ${c(t.btnWrapPadding, isLink && `0`)};
      box-sizing: border-box;
      display: inline-block;
    `;
  },

  narrow(s: any) {
    return css`
      padding-left: 5px;
      padding-right: 5px;
    `;
  },

  noPadding(s: any) {
    return css`
      padding-left: 0;
      padding-right: 0;
    `;
  },

  noRightPadding(s: any) {
    return css`
      padding-right: 0;
    `;
  },

  wrapArrow(s: any) {
    return css`
      margin-right: 10px;
    `;
  },

  wrapArrowLeft(s: any) {
    return css`
      margin-right: 0;
      margin-left: 10px;
    `;
  },

  arrow(s: any) {
    return css`
      position: absolute;
      border-radius: 2px 2px 2px 16px;
      box-sizing: border-box;
      z-index: 1;
    `;
  },

  icon(s: any) {
    const { theme: t } = s;
    const isLink = s.props.use === 'link';
    return css`
      display: inline-block;
      padding-right: ${c(`7px`, isLink && t.linkIconMarginRight)};
    `;
  },

  buttonWithIcon(s: any) {
    return css`
      padding-right: 15px;
      padding-left: 15px;
    `;
  },

  borderless(s: any) {
    const focus = s.state.focusedByTab || !!s.props.visuallyFocused;
    const { disabled, checked, active, loading } = s.props;
    return !focus && !disabled && !checked && !active && !loading
      ? css`
          &,
          &:hover,
          &:active {
            box-shadow: none;
          }
        `
      : ``;
  },

  loading(s: any) {
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
