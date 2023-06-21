import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

import {
  linkMixin,
  linkDisabledMixin,
  linkUseColorsMixin,
  linkUseLineColorsMixin,
  linkUseLineColorsHoverMixin,
} from './Link.mixins';

export const globalClasses = prefix('link')({
  text: 'text',
});

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

  lineFocus(t: Theme) {
    return css`
      color: ${t.linkHoverColor};
      .${globalClasses.text} {
        border-bottom-color: ${t.linkLineHoverBorderBottomColor} !important;
      }
    `;
  },

  lineFocusSuccess(t: Theme) {
    return css`
      color: ${t.linkSuccessHoverColor} !important;
      .${globalClasses.text} {
        border-bottom-color: ${t.linkLineHoverBorderBottomColorSuccess} !important;
      }
    `;
  },

  lineFocusDanger(t: Theme) {
    return css`
      color: ${t.linkDangerHoverColor} !important;
      .${globalClasses.text} {
        border-bottom-color: ${t.linkLineHoverBorderBottomColorDanger} !important;
      }
    `;
  },

  lineFocusGrayed(t: Theme) {
    return css`
      color: ${t.linkGrayedHoverColor} !important;
      .${globalClasses.text} {
        border-bottom-color: ${t.linkLineHoverBorderBottomColorGrayed} !important;
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

      & .${globalClasses.text}:before {
        border-bottom-color: ${t.linkDisabledColor} !important; // override root color
      }

      &:hover {
        color: ${t.linkDisabledColor};
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

export const customStyles = {
  lineText(t: Theme, color: string) {
    return css`
      border-bottom-color: ${ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity))};
      border-bottom-style: ${t.linkLineBorderBottomStyle};
      border-bottom-width: ${t.linkLineBorderBottomWidth};
    `;
  },
  useDefault(t: Theme, color: string) {
    return css`
      ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
      ${linkUseLineColorsHoverMixin(t.linkLineHoverBorderBottomColor, `.${globalClasses.text}`)}
      .${globalClasses.text} {
        ${linkUseLineColorsMixin(
          ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity)),
          t.linkLineActiveBorderBottomColor,
        )};
      }
    `;
  },
  useSuccess(t: Theme, color: string) {
    return css`
      ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
      ${linkUseLineColorsHoverMixin(t.linkLineHoverBorderBottomColorSuccess, `.${globalClasses.text}`)}
      .${globalClasses.text} {
        ${linkUseLineColorsMixin(
          ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity)),
          t.linkLineActiveBorderBottomColorSuccess,
        )};
      }
    `;
  },

  useDanger(t: Theme, color: string) {
    return css`
      ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
      ${linkUseLineColorsHoverMixin(t.linkLineHoverBorderBottomColorDanger, `.${globalClasses.text}`)}
      .${globalClasses.text} {
        ${linkUseLineColorsMixin(
          ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity)),
          t.linkLineActiveBorderBottomColorDanger,
        )};
      }
    `;
  },

  useGrayed(t: Theme, color: string) {
    return css`
      ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
      ${linkUseLineColorsHoverMixin(t.linkLineHoverBorderBottomColorGrayed, `.${globalClasses.text}`)}
      .${globalClasses.text} {
        ${linkUseLineColorsMixin(
          ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity)),
          t.linkLineActiveBorderBottomColorGrayed,
        )};
      }
    `;
  },
};
