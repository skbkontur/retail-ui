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
    animation: ${line} 1s linear !important; // override creevey
    animation-play-state: paused !important;
    animation-delay: ${delay}s !important;
    animation-fill-mode: forwards !important;
  `;
};

export const styles = memoizeStyle({
  root() {
    return css`
      position: relative;
      border-radius: 1px;
      outline: none;
      text-decoration: none;
    `;
  },

  rootHovered(t: Theme) {
    return css`
      ${linkMixin(t.linkHoverTextDecoration)};
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
      border-bottom-style: ${t.linkLineBorderBottomStyle};
      border-bottom-width: ${t.linkLineBorderBottomWidth};
    `;
  },

  lineTextDefault(t: Theme) {
    return css`
      @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
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

  lineTextWithUnderlineOnHover(t: Theme) {
    return css`
      border-bottom-color: transparent;
      transition: border-bottom-color ${t.transitionDuration} ${t.transitionTimingFunction};
      &:hover {
        border-bottom-color: currentColor;
      }
    `;
  },

  lineTextWithUnderline() {
    return css`
      border-bottom-color: currentColor;
    `;
  },

  lineFocus(t: Theme) {
    return css`
      color: ${t.linkHoverColor};
    `;
  },

  lineFocusHover(t: Theme) {
    return css`
      .${globalClasses.text} {
        ${linkUseLineHovered(t.linkLineHoverBorderBottomStyle)}
      }
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

  useRoot() {
    return css`
      border-bottom-color: currentColor;
    `;
  },

  useDefault(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
    `;
  },

  useHoveredRoot(t: Theme) {
    return css`
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
    `;
  },

  useDanger(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
    `;
  },

  useGrayed(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
    `;
  },

  useGrayedFocus(t: Theme) {
    return css`
      color: ${t.linkDisabledColor};
    `;
  },

  underlined() {
    return css`
      text-decoration: underline;
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
