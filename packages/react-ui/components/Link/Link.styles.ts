import { css, keyframes, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { linkDisabledMixin, linkUseColorsMixin } from './Link.mixins';

const line = keyframes`
  0% {
    text-decoration-color: inherit;
  }
  100% {
    text-decoration-color: transparent;
  }
`;

const oldLineText = function (t: Theme) {
  const delay = parseFloat(t.linkTextUnderlineOpacity) - 1;
  return css`
    animation: ${line} 1s linear !important; // override creevey
    animation-play-state: paused !important;
    animation-delay: ${delay}s !important;
    animation-fill-mode: forwards !important;
  `;
};

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      cursor: pointer;
      position: relative;

      border-radius: 1px;
      text-decoration: ${t.linkTextDecoration};
      text-decoration-style: ${t.linkTextDecorationStyle};
      text-underline-offset: ${t.linkTextUnderlineOffset};
      text-decoration-thickness: ${t.linkTextDecorationThickness};
      transition: text-decoration-color ${t.transitionDuration} ${t.transitionTimingFunction};
      @supports (text-decoration-color: ${t.linkTextDecorationColor}) {
        text-decoration-color: ${t.linkTextDecorationColor};
        &:hover {
          text-decoration-color: currentColor;
          text-decoration-style: ${t.linkHoverTextDecorationStyle};
        }
      }
      @supports not (text-decoration-color: ${t.linkTextDecorationColor}) {
        ${oldLineText(t)};
        &:hover {
          text-decoration-style: ${t.linkHoverTextDecorationStyle};
          animation: none !important;
        }
      }
    `;
  },

  lineFocus(t: Theme) {
    return css`
      color: ${t.linkHoverColor};
    `;
  },

  lineFocusSuccess(t: Theme) {
    return css`
      color: ${t.linkSuccessHoverColor} !important;
    `;
  },

  lineFocusDanger(t: Theme) {
    return css`
      color: ${t.linkDangerHoverColor} !important;
    `;
  },

  lineFocusGrayed(t: Theme) {
    return css`
      color: ${t.linkGrayedHoverColor} !important;
    `;
  },

  button(t: Theme) {
    return css`
      display: inline-block;
      line-height: ${t.linkButtonLineHeight};
      padding-left: ${t.linkButtonPaddingX};
      padding-right: ${t.linkButtonPaddingX};
    `;
  },

  buttonOpened(t: Theme) {
    return css`
      background: ${t.btnDefaultActiveBg};
    `;
  },

  arrow() {
    return css`
      border: 4px solid transparent;
      border-bottom-width: 0;
      border-top-color: #a0a0a0;
      display: inline-block;
      margin-bottom: 3px;
      margin-left: 3px;
      vertical-align: middle;
    `;
  },

  default(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
    `;
  },

  success(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
    `;
  },

  danger(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
    `;
  },

  grayed(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
    `;
  },

  useGrayedFocus(t: Theme) {
    return css`
      color: ${t.linkDisabledColor};
    `;
  },

  focus(t: Theme) {
    return css`
      text-decoration: ${t.linkHoverTextDecoration};
      outline: ${t.linkFocusOutline};
    `;
  },

  disabled(t: Theme) {
    return css`
      ${linkDisabledMixin()};

      color: ${t.linkDisabledColor} !important; // override root color

      &:hover {
        color: ${t.linkDisabledColor};
      }
    `;
  },

  icon() {
    return css`
      display: inline-block;
    `;
  },

  iconLeft(t: Theme) {
    return css`
      margin-right: ${t.linkIconMarginRight};
    `;
  },

  iconRight(t: Theme) {
    return css`
      margin-left: ${t.linkIconMarginLeft};
    `;
  },

  warning(t: Theme) {
    return css`
      background-color: ${t.btnWarningSecondary};
      box-shadow: 0 0 0 2px ${t.btnWarningSecondary};
    `;
  },

  error(t: Theme) {
    return css`
      background-color: ${t.btnErrorSecondary};
      box-shadow: 0 0 0 2px ${t.btnErrorSecondary};
    `;
  },
});
