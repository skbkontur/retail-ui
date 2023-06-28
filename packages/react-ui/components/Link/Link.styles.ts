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
        border-bottom-color: ${t.linkHoverColor} !important;
      }
    `;
  },

  lineFocusSuccess(t: Theme) {
    return css`
      color: ${t.linkSuccessHoverColor} !important;
      .${globalClasses.text} {
        border-bottom-color: ${t.linkSuccessHoverColor} !important;
      }
    `;
  },

  lineFocusDanger(t: Theme) {
    return css`
      color: ${t.linkDangerHoverColor} !important;
      .${globalClasses.text} {
        border-bottom-color: ${t.linkDangerHoverColor} !important;
      }
    `;
  },

  lineFocusGrayed(t: Theme) {
    return css`
      color: ${t.linkGrayedHoverColor} !important;
      .${globalClasses.text} {
        border-bottom-color: ${t.linkGrayedHoverColor} !important;
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
  lineText(t: Theme, color: string, isTheme2022: boolean) {
    const borderBottomColor = isTheme2022
      ? ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity))
      : t.linkColor;
    return css`
      border-bottom-color: ${borderBottomColor};
      border-bottom-style: ${t.linkLineBorderBottomStyle};
      border-bottom-width: ${t.linkLineBorderBottomWidth};
    `;
  },
  useDefault(t: Theme, color: string, isTheme2022: boolean) {
    const borderBottomColor = isTheme2022
      ? ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity))
      : t.linkColor;
    return css`
      ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
      ${linkUseLineColorsHoverMixin(t.linkHoverColor, `.${globalClasses.text}`)}
      .${globalClasses.text} {
        ${linkUseLineColorsMixin(
          ColorFunctions.fade(borderBottomColor, parseFloat(t.linkLineBorderBottomOpacity)),
          t.linkActiveColor,
        )};
      }
    `;
  },
  useSuccess(t: Theme, color: string, isTheme2022: boolean) {
    const borderBottomColor = isTheme2022
      ? ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity))
      : t.linkSuccessColor;
    return css`
      ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
      ${linkUseLineColorsHoverMixin(t.linkSuccessHoverColor, `.${globalClasses.text}`)}
      .${globalClasses.text} {
        ${linkUseLineColorsMixin(
          ColorFunctions.fade(borderBottomColor, parseFloat(t.linkLineBorderBottomOpacity)),
          t.linkSuccessActiveColor,
        )};
      }
    `;
  },

  useDanger(t: Theme, color: string, isTheme2022: boolean) {
    const borderBottomColor = isTheme2022
      ? ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity))
      : t.linkDangerColor;
    return css`
      ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
      ${linkUseLineColorsHoverMixin(t.linkDangerHoverColor, `.${globalClasses.text}`)}
      .${globalClasses.text} {
        ${linkUseLineColorsMixin(
          ColorFunctions.fade(borderBottomColor, parseFloat(t.linkLineBorderBottomOpacity)),
          t.linkDangerActiveColor,
        )};
      }
    `;
  },

  useGrayed(t: Theme, color: string, isTheme2022: boolean) {
    const borderBottomColor = isTheme2022
      ? ColorFunctions.fade(color, parseFloat(t.linkLineBorderBottomOpacity))
      : t.linkGrayedColor;
    return css`
      ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
      ${linkUseLineColorsHoverMixin(t.linkGrayedHoverColor, `.${globalClasses.text}`)}
      .${globalClasses.text} {
        ${linkUseLineColorsMixin(
          ColorFunctions.fade(borderBottomColor, parseFloat(t.linkLineBorderBottomOpacity)),
          t.linkGrayedActiveColor,
        )};
      }
    `;
  },
};
