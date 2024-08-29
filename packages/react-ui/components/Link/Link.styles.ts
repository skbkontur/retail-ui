import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { linkDisabledMixin, linkMixin, linkUseColorsMixin, linkUseLineHovered } from './Link.mixins';

export const globalClasses = prefix('link')({
  textWrapper: 'textWrapper',
  text: 'text',
});

const oldLineText = (t: Theme, emotion: Emotion) => {
  const line = emotion.keyframes`
  0% {
    border-bottom-color: inherit;
  }
  100% {
    border-bottom-color: transparent;
  }
`;
  const delay = parseFloat(t.linkLineBorderBottomOpacity) - 1;
  return emotion.css`
    border-bottom-style: ${t.linkLineBorderBottomStyle};
    border-bottom-width: ${t.linkLineBorderBottomWidth};
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
        ${linkMixin(t.linkHoverTextDecoration)};
        position: relative;
      `;
    },

    lineRoot() {
      return emotion.css`
        border-radius: 1px;
        outline: none;
        text-decoration: none;
        &:hover .${globalClasses.text} {
          border-bottom-color: currentColor !important;
        }
      `;
    },

    lineTextWrapper(t: Theme) {
      // При hover'е подчеркивание из прозрачного переходит в currentColor.
      // За счет наложения этого цвета на подчеркивание lineText (currentColor с половинной прозрачностью)
      // достигается эффект перехода currentColor с половинной прозрачностью до currentColor.

      // Планировалось добавить transition и color-mix(in srgb, currentColor 50%, transparent) в lineText.
      // Однако, в chrome и edge сочетание transition, color-mix и currentColor вызывает моргание при transition.
      return emotion.css`
        @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
          transition: border-bottom-color ${t.transitionDuration} ${t.transitionTimingFunction};
          border-bottom-style: ${t.linkLineBorderBottomStyle};
          border-bottom-width: ${t.linkLineBorderBottomWidth};
          border-bottom-color: transparent;
        }
      `;
    },

    lineTextWrapperFocused(t: Theme) {
      return emotion.css`
        @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
          border-bottom-color: currentColor;
          border-bottom-style: ${t.linkLineHoverBorderBottomStyle};
        }
      `;
    },

    lineText(t: Theme) {
      return emotion.css`
        @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
          border-bottom-style: ${t.linkLineBorderBottomStyle};
          border-bottom-width: ${t.linkLineBorderBottomWidth};
          border-bottom-color: ${t.linkLineBorderBottomColor};
        }
        @supports not (border-bottom-color: ${t.linkLineBorderBottomColor}) {
          ${oldLineText(t, emotion)};
        }
      `;
    },

    lineTextIE11(t: Theme) {
      return emotion.css`
        ${oldLineText(t, emotion)};
      `;
    },

    lineFocus(t: Theme) {
      return emotion.css`
        color: ${t.linkHoverColor};

        .${globalClasses.text} {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      `;
    },

    lineFocusSuccess(t: Theme) {
      return emotion.css`
        color: ${t.linkSuccessHoverColor} !important;

        .${globalClasses.text} {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      `;
    },

    lineFocusDanger(t: Theme) {
      return emotion.css`
        color: ${t.linkDangerHoverColor} !important;

        .${globalClasses.text} {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      `;
    },

    lineFocusGrayed(t: Theme) {
      return emotion.css`
        color: ${t.linkGrayedHoverColor} !important;

        .${globalClasses.text} {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
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

    useRoot() {
      return emotion.css`
        border-bottom-color: currentColor;
      `;
    },

    useDefault(t: Theme) {
      return emotion.css`
        ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
        .${globalClasses.text} {
          :hover {
            ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
          }
        }
      `;
    },

    useSuccess(t: Theme) {
      return emotion.css`
        ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
        .${globalClasses.text} {
          :hover {
            ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
          }
        }
      `;
    },

    useDanger(t: Theme) {
      return emotion.css`
        ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
        .${globalClasses.text} {
          :hover {
            ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
          }
        }
      `;
    },

    useGrayed(t: Theme) {
      return emotion.css`
        ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
        .${globalClasses.text} {
          :hover {
            ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
          }
        }
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
      `;
    },

    focus2022(t: Theme) {
      return emotion.css`
        outline: ${t.linkFocusOutline};

        .${globalClasses.text} {
          &,
          &:hover {
            ${linkUseLineHovered('none')}
          }
        }

        .${globalClasses.textWrapper} {
          border-bottom-style: none;
        }
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

    disabledDark22Theme(t: Theme) {
      return emotion.css`
        .${globalClasses.text} {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
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
  });
