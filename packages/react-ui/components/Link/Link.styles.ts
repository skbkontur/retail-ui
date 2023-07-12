import { css, keyframes, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { linkMixin, linkDisabledMixin, linkUseColorsMixin, linkUseLineWithoutOpacity } from './Link.mixins';

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

  lineText(t: Theme) {
    return css`
      border-bottom-style: ${t.linkLineBorderBottomStyle};
      border-bottom-width: ${t.linkLineBorderBottomWidth};
      animation: ${line} 1s linear !important; // override creevey
      animation-play-state: paused !important;
      animation-delay: -0.5s !important;
    `;
  },

  lineFocus(t: Theme) {
    return css`
      color: ${t.linkHoverColor};
      .${globalClasses.text} {
        ${linkUseLineWithoutOpacity()}
      }
    `;
  },

  lineFocusSuccess(t: Theme) {
    return css`
      color: ${t.linkSuccessHoverColor} !important;
      .${globalClasses.text} {
        ${linkUseLineWithoutOpacity()}
      }
    `;
  },

  lineFocusDanger(t: Theme) {
    return css`
      color: ${t.linkDangerHoverColor} !important;
      .${globalClasses.text} {
        ${linkUseLineWithoutOpacity()}
      }
    `;
  },

  lineFocusGrayed(t: Theme) {
    return css`
      color: ${t.linkGrayedHoverColor} !important;
      .${globalClasses.text} {
        ${linkUseLineWithoutOpacity()}
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
          ${linkUseLineWithoutOpacity()}
        }
      }
    `;
  },

  useSuccess(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineWithoutOpacity()}
        }
      }
    `;
  },

  useDanger(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineWithoutOpacity()}
        }
      }
    `;
  },

  useGrayed(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
      .${globalClasses.text} {
        :hover {
          ${linkUseLineWithoutOpacity()}
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

  disabledDark22Theme() {
    return css`
      .${globalClasses.text} {
        ${linkUseLineWithoutOpacity()}
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
