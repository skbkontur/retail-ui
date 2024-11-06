import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { linkDisabledMixin, linkUseColorsMixin } from './Link.mixins';

const oldLineText = (t: Theme, emotion: Emotion) => {
  const line = emotion.keyframes`
  0% {
    text-decoration-color: inherit;
  }
  100% {
    text-decoration-color: transparent;
  }
`;
  const delay = parseFloat(t.linkTextUnderlineOpacity) - 1;
  return emotion.css`
    animation: ${line} 1s linear !important; // override creevey
    animation-play-state: paused !important;
    animation-delay: ${delay}s !important;
    animation-fill-mode: forwards !important;
  `;
};

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
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
          ${oldLineText(t, emotion)};
          &:hover {
            text-decoration-style: ${t.linkHoverTextDecorationStyle};
            animation: none !important;
          }
        }
      `;
    },

    lineFocus(t: Theme) {
      return emotion.css`
        color: ${t.linkHoverColor};
      `;
    },

    lineFocusSuccess(t: Theme) {
      return emotion.css`
        color: ${t.linkSuccessHoverColor} !important;
      `;
    },

    lineFocusDanger(t: Theme) {
      return emotion.css`
        color: ${t.linkDangerHoverColor} !important;
      `;
    },

    lineFocusGrayed(t: Theme) {
      return emotion.css`
        color: ${t.linkGrayedHoverColor} !important;
      `;
    },

    button(t: Theme) {
      return emotion.css`
        display: inline-block;
        line-height: ${t.linkButtonLineHeight};
        padding-left: ${t.linkButtonPaddingX};
        padding-right: ${t.linkButtonPaddingX};
      `;
    },

    buttonOpened(t: Theme) {
      return emotion.css`
        background: ${t.btnDefaultActiveBg};
      `;
    },

    arrow() {
      return emotion.css`
        border: 4px solid transparent;
        border-bottom-width: 0;
        border-top-color: #a0a0a0;
        display: inline-block;
        margin-bottom: 3px;
        margin-left: 3px;
        vertical-align: middle;
      `;
    },

    useDefault(t: Theme) {
      return emotion.css`
        ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
      `;
    },

    useSuccess(t: Theme) {
      return emotion.css`
        ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
      `;
    },

    useDanger(t: Theme) {
      return emotion.css`
        ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
      `;
    },

    useGrayed(t: Theme) {
      return emotion.css`
        ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
      `;
    },

    useGrayedFocus(t: Theme) {
      return emotion.css`
        color: ${t.linkDisabledColor};
      `;
    },

    focus(t: Theme) {
      return emotion.css`
        text-decoration: ${t.linkHoverTextDecoration};
        outline: ${t.linkFocusOutline};
      `;
    },

    disabled(t: Theme) {
      return emotion.css`
        ${linkDisabledMixin()};

        color: ${t.linkDisabledColor} !important; // override root color

        &:hover {
          color: ${t.linkDisabledColor};
        }
      `;
    },

    icon() {
      return emotion.css`
        display: inline-block;
      `;
    },

    iconLeft(t: Theme) {
      return emotion.css`
        margin-right: ${t.linkIconMarginRight};
      `;
    },

    iconRight(t: Theme) {
      return emotion.css`
        margin-left: ${t.linkIconMarginLeft};
    `;
    },

    warning(t: Theme) {
      return emotion.css`
        background-color: ${t.btnWarningSecondary};
        box-shadow: 0 0 0 2px ${t.btnWarningSecondary};
      `;
    },

    error(t: Theme) {
      return emotion.css`
        background-color: ${t.btnErrorSecondary};
        box-shadow: 0 0 0 2px ${t.btnErrorSecondary};
      `;
    },
  });
