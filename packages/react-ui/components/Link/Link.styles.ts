import { css, keyframes, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { linkMixin, linkDisabledMixin, linkUseColorsMixin, linkUseLineHovered } from './Link.mixins';

export const globalClasses = prefix('link')({
  text: 'text',
});

const line = keyframes`
  0% {
    border-bottom-color: inherit;
  }
  100% {
    border-bottom-color: transparent;
  }
`;

const oldLineText = function (t: Theme) {
  const delay = parseFloat(t.linkLineBorderBottomOpacity) - 1;
  return css`
    border-bottom-style: ${t.linkLineBorderBottomStyle};
    border-bottom-width: ${t.linkLineBorderBottomWidth};
    animation: ${line} 1s linear !important; // override creevey
    animation-play-state: paused !important;
    animation-delay: ${delay}s !important;
    animation-fill-mode: forwards !important;
  `;
};

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      ${linkMixin(t.linkHoverTextDecoration)};
      position: relative;
    `;
  },

  lineRoot() {
    return css`
      border-radius: 1px;
      outline: none;
      text-decoration: none;
    `;
  },

  lineTextWrapper(t: Theme) {
    // При hover'е подчеркивание из прозрачного переходит в currentColor.
    // За счет наложения этого цвета на подчеркивание lineText (currentColor с половинной прозрачностью)
    // достигается эффект перехода currentColor с половинной прозрачностью до currentColor.

    // Планировалось добавить transition и color-mix(in srgb, currentColor 50%, transparent) в lineText.
    // Однако, в chrome и edge сочетание transition, color-mix и currentColor вызывает моргание при transition.
    return css`
      @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
        transition: border-bottom-color ${t.transitionDuration} ${t.transitionTimingFunction};
        border-bottom-style: ${t.linkLineBorderBottomStyle};
        border-bottom-width: ${t.linkLineBorderBottomWidth};
        border-bottom-color: transparent;
        &:hover {
          border-bottom-color: currentColor;
        }
      }
    `;
  },

  lineText(t: Theme) {
    return css`
      @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
        border-bottom-style: ${t.linkLineBorderBottomStyle};
        border-bottom-width: ${t.linkLineBorderBottomWidth};
        border-bottom-color: ${t.linkLineBorderBottomColor};
      }
      @supports not (border-bottom-color: ${t.linkLineBorderBottomColor}) {
        ${oldLineText(t)};
      }
    `;
  },

  lineTextIE11(t: Theme) {
    return css`
      ${oldLineText(t)};
    `;
  },

  lineTextWithUnderlineOnHover() {
    return css`
      border-bottom-color: transparent !important; //override
    `;
  },

  lineFocus(t: Theme) {
    return css`
      color: ${t.linkHoverColor};
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },

  lineFocusSuccess(t: Theme) {
    return css`
      color: ${t.linkSuccessHoverColor} !important;
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },

  lineFocusDanger(t: Theme) {
    return css`
      color: ${t.linkDangerHoverColor} !important;
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },

  lineFocusGrayed(t: Theme) {
    return css`
      color: ${t.linkGrayedHoverColor} !important;
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
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

  useRoot() {
    return css`
      border-bottom-color: currentColor;
    `;
  },
  useDefault(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },

  useSuccess(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },

  useDanger(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
    `;
  },

  useGrayed(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
        }
      }
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

  disabledDark22Theme(t: Theme) {
    return css`
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
    `;
  },

  icon(t: Theme) {
    return css`
      display: inline-block;
      margin-right: ${t.linkIconMarginRight};
    `;
  },
});
