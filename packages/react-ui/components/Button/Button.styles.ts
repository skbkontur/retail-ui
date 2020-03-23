import { resetButton, resetText } from '../../lib/styles/Mixins';
import { cssName, GrandStyles, keyframes } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import {
  buttonActiveMixin,
  buttonArrowMixin,
  buttonHoverMixin,
  buttonLoadingArrowMixin,
  buttonSizeMixin,
  buttonUseMixin,
} from './Button.mixins';

const btn_loading_arrow = keyframes`
0% {
  transform: translateX(50px) rotate(-44.3deg);
}

100% {
  transform: translateX(21px) translateY(30px) rotate(-44.3deg);
}
`;

export class Styles extends GrandStyles {
  root(t: Theme) {
    return this.css`
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
      &:not(${cssName(this.sizeSmall(t))}) {
        border-radius: ${t.btnBorderRadius};
      }
      ${cssName(this.link(t))}& {
        padding: 0;
      }
      &:active:not(${cssName(this.link(t))}):not(${cssName(this.disabled(t))}) {
        ${cssName(this.caption())} {
          transform: translateY(1px) !important;
        }
      }
    `;
  }

  warning(t: Theme) {
    return this.css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: 0 0 0 2px ${t.borderColorWarning};
    `;
  }

  error(t: Theme) {
    return this.css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: 0 0 0 2px ${t.borderColorError};
    `;
  }

  sizeSmall(t: Theme) {
    return this.css`
      border-radius: ${t.btnSmallBorderRadius};

      ${buttonSizeMixin(
        t.btnFontSizeSmall,
        t.controlHeightSmall,
        t.btnHeightShift,
        t.controlLineHeightSmall,
        t.btnPaddingXSmall,
        t.btnPaddingYSmall,
        cssName(this.link(t)),
        cssName(this.fallback(t)),
      )};

      ${cssName(this.arrow())} {
        border-radius: ${t.btnSmallArrowBorderRadius};
      }

      ${buttonArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowLeft,
        t.btnSmallArrowRight,
        t.btnSmallArrowLength,
        'rotate(53deg) skewX(24deg) skewY(10deg)',
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  sizeMedium(t: Theme) {
    return this.css`
      ${buttonSizeMixin(
        t.btnFontSizeMedium,
        t.controlHeightMedium,
        t.btnHeightShift,
        t.controlLineHeightMedium,
        t.btnPaddingXMedium,
        t.btnPaddingYMedium,
        cssName(this.link(t)),
        cssName(this.fallback(t)),
      )};

      ${buttonArrowMixin(
        '9px',
        t.btnMediumArrowLeft,
        t.btnMediumArrowRight,
        '20.2px',
        t.btnMediumArrowTransform,
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  sizeLarge(t: Theme) {
    return this.css`
      ${buttonSizeMixin(
        t.btnFontSizeLarge,
        t.controlHeightLarge,
        t.btnHeightShift,
        t.controlLineHeightLarge,
        t.btnPaddingXLarge,
        t.btnPaddingYLarge,
        cssName(this.link(t)),
        cssName(this.fallback(t)),
      )};

      ${buttonArrowMixin(
        '10.2px',
        t.btnLargeArrowLeft,
        '-10.8px',
        '22.2px',
        t.btnLargeArrowTransform,
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  sizeSmallLoading(t: Theme) {
    return this.css`
      ${buttonLoadingArrowMixin(
        t.btnSmallArrowTop,
        t.btnSmallArrowTop,
        '-207px',
        '441%',
        t.btnSmallArrowBg,
        t.btnSmallArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  sizeMediumLoading(t: Theme) {
    return this.css`
      ${buttonLoadingArrowMixin(
        '0',
        '0',
        t.btnMediumArrowLeftLoadingLeft,
        '441%',
        t.btnMediumArrowBg,
        t.btnMediumArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  sizeLargeLoading(t: Theme) {
    return this.css`
      ${buttonLoadingArrowMixin(
        '-32px',
        '-36px',
        ' -198px',
        '700%',
        t.btnLargeArrowBg,
        t.btnLargeArrowLeftLoadingDelay,
        btn_loading_arrow,
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  link(t: Theme) {
    return this.css`
      background: none;
      border-radius: ${t.btnLinkBorderRadius} !important;
      border: none;
      box-shadow: none;
      color: ${t.linkColor} !important;
      display: inline;
      line-height: inherit !important;
      margin: 0;
      padding: 0;

      &:hover {
        color: ${t.linkHoverColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkActiveColor} !important;
      }
      ${cssName(this.caption())} {
        display: inline;
      }
      ${cssName(this.icon())} {
        padding-right: ${t.linkIconMarginRight};
      }
      ${cssName(this.warning(t))} ,
      ${cssName(this.error(t))}  {
        box-shadow: none;
        left: -2px !important;
        right: -2px !important;
        bottom: -2px !important;
      }
      ${cssName(this.error(t))}  {
        background: ${t.errorSecondary} !important;
      }
    `;
  }

  focus(t: Theme) {
    return this.css`
      position: relative;
      z-index: 2;

      &${cssName(this.link(t))} {
        color: ${t.linkColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }

      &:not(${cssName(this.disabled(t))}):not(${cssName(this.link(t))}) {
        border: ${t.btnFocusBorder};

        &,
        &:hover,
        &:active,
        ${cssName(this.active(t))} {
          box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.btnFocusShadowWidth} ${t.borderColorFocus};

          &${cssName(this.warning(t))}, &${cssName(this.error(t))} {
            box-shadow: inset 0 0 0 1px ${t.outlineColorFocus} !important;
            border-color: transparent !important;
          }
          ${cssName(this.arrow())} {
            box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus};

            &${cssName(this.arrowWarning(t))} {
              box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning} !important;
            }

            &${cssName(this.arrowError(t))} {
              box-shadow: inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorError} !important;
            }
          }
        }
      }
    `;
  }

  disabled(t: Theme) {
    return this.css`
      cursor: default;
      pointer-events: none;
      border-color: transparent !important;

      &:not(${cssName(this.link(t))}) {
        background: ${t.btnDisabledBg} !important;
        color: ${t.btnDisabledTextColor} !important;
        box-shadow: ${t.btnDisabledShadow} !important;

        ${cssName(this.arrow())} {
          background: ${t.btnDisabledBg} !important;
          box-shadow: ${t.btnDisabledShadowArrow} !important;
        }
      }

      &${cssName(this.link(t))} {
        color: ${t.linkDisabledColor} !important;
      }
    `;
  }

  fallback(t: Theme) {
    return this.css`
      &${cssName(this.disabled(t))} {
        outline-color: transparent;
      }
      &:not(${cssName(this.link(t))}) {
        line-height: normal !important;
      }
    `;
  }

  validationRoot(t: Theme) {
    return this.css`
      ${cssName(this.focus(t))} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus};
        border-color: transparent !important;
      }
    `;
  }

  arrowWarning(t: Theme) {
    return this.css`
      box-shadow: 2px -2px 0 0 ${t.borderColorWarning} !important;
    `;
  }

  arrowError(t: Theme) {
    return this.css`
      box-shadow: 2px -2px 0 0 ${t.borderColorError} !important;
    `;
  }

  arrowLeft(t: Theme) {
    return this.css`
      visibility: visible;

      ${cssName(this.checked(t))}:not(${cssName(this.focus(t))}) & {
        box-shadow: ${t.btnCheckedShadowArrowLeft} !important;
      }
    `;
  }

  default(t: Theme) {
    return this.css`
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
        cssName(this.checked(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
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
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveBg,
        t.btnDefaultActiveShadow,
        t.btnDefaultActiveShadowArrow,
        t.btnDefaultActiveShadowArrowLeft,
        cssName(this.active(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  primary(t: Theme) {
    return this.css`
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
        cssName(this.checked(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
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
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveBg,
        t.btnPrimaryActiveShadow,
        t.btnPrimaryActiveShadowArrow,
        t.btnPrimaryActiveShadowArrowLeft,
        cssName(this.active(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  success(t: Theme) {
    return this.css`
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
        cssName(this.checked(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
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
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveBg,
        t.btnSuccessActiveShadow,
        t.btnSuccessActiveShadowArrow,
        t.btnSuccessActiveShadowArrowLeft,
        cssName(this.active(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  danger(t: Theme) {
    return this.css`
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
        cssName(this.checked(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
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
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveBg,
        t.btnDangerActiveShadow,
        t.btnDangerActiveShadowArrow,
        t.btnDangerActiveShadowArrowLeft,
        cssName(this.active(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  pay(t: Theme) {
    return this.css`
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
        cssName(this.checked(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
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
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};

      ${buttonActiveMixin(
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveBg,
        t.btnPayActiveShadow,
        t.btnPayActiveShadowArrow,
        t.btnPayActiveShadowArrowLeft,
        cssName(this.active(t)),
        cssName(this.arrow()),
        cssName(this.arrowLeft(t)),
      )};
    `;
  }

  checked(t: Theme) {
    return this.css`
      box-shadow: ${t.btnCheckedShadow} !important;
      background: ${t.btnCheckedBg} !important;
      color: ${t.btnCheckedTextColor} !important;
      border: ${t.btnDefaultCheckedBorder} !important;

      &:not(${cssName(this.link(t))}):not(${cssName(this.disabled(t))}) {
        ${cssName(this.caption())} {
          transform: translateY(1px) !important;
        }
      }

      &,
      &:not(${cssName(this.focus(t))}) {
        ${cssName(this.arrow())} {
          background: ${t.btnCheckedBg} !important;
          box-shadow: ${t.btnCheckedShadowArrow} !important;
        }
      }
    `;
  }

  active(t: Theme) {
    return this.css`
      &:not(${cssName(this.link(t))}):not(${cssName(this.disabled(t))}) {
        ${cssName(this.caption())} {
          transform: translateY(1px) !important;
        }
      }
    `;
  }

  caption() {
    return this.css`
      position: relative;
      white-space: nowrap;
      display: inline-block;
      width: 100%;
      vertical-align: top;
    `;
  }

  wrap(t: Theme) {
    return this.css`
      padding: ${t.btnWrapPadding};
      box-sizing: border-box;
      display: inline-block;
    `;
  }

  narrow() {
    return this.css`
      padding-left: 5px !important;
      padding-right: 5px !important;
    `;
  }

  noPadding() {
    return this.css`
      padding-left: 0 !important;
      padding-right: 0 !important;
    `;
  }

  noRightPadding() {
    return this.css`
      padding-right: 0 !important;
    `;
  }

  wrapLink(t: Theme) {
    return this.css`
      ${this.wrap(t)};

      padding: 0;
    `;
  }

  wrapArrow() {
    return this.css`
      margin-right: 10px;
    `;
  }

  wrapArrowLeft() {
    return this.css`
      margin-right: 0;
      margin-left: 10px;
    `;
  }

  arrow() {
    return this.css`
      position: absolute;
      border-radius: 2px 2px 2px 16px;
      box-sizing: border-box;
      z-index: 1;
    `;
  }

  icon() {
    return this.css`
      display: inline-block;
      padding-right: 7px;
    `;
  }

  buttonWithIcon() {
    return this.css`
      padding-right: 15px;
      padding-left: 15px;
    `;
  }

  borderless(t: Theme) {
    const focus = cssName(this.focus(t));
    const disabled = cssName(this.disabled(t));
    const checked = cssName(this.checked(t));
    const active = cssName(this.active(t));

    return this.css`
      &:not(${focus}):not(${disabled}):not(${active}):not(${checked}) {
        &,
        &:hover,
        &:active {
          box-shadow: none !important;
        }
      }
    `;
  }

  loading() {
    const btn_loading = keyframes`
    0% {
      transform: translateX(0) rotateY(180deg);
    }

    100% {
      transform: translateX(-30px) rotateY(180deg);
    }
  `;
    return this.css`
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
  }
}
