import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { linkMixin, linkDisabledMixin, linkUseColorsMixin, linkUseLineColorsMixin } from './Link.mixins';

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

  lineText(t: Theme) {
    return css`
      position: relative;

      &:before {
        content: '';
        pointer-events: none;
        position: absolute;
        height: 0;
        width: 100%;
        bottom: ${t.linkLineBottom};
        border-bottom-color: ${t.linkLineBorderBottomColor};
        border-bottom-style: ${t.linkLineBorderBottomStyle};
        border-bottom-width: ${t.linkLineBorderBottomWidth};
      }
    `;
  },

  lineFocus(t: Theme) {
    return css`
      & {
        color: ${t.linkHoverColor};
        &:before {
          border-bottom-color: ${t.linkLineHoverBorderBottomColor};
        }
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

  useDefault(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkColor, t.linkHoverColor, t.linkActiveColor)};
      ${linkUseLineColorsMixin(
        t.linkLineBorderBottomColor,
        t.linkLineHoverBorderBottomColor,
        t.linkLineActiveBorderBottomColor,
        globalClasses.text,
      )};
    `;
  },

  useSuccess(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkSuccessColor, t.linkSuccessHoverColor, t.linkSuccessActiveColor)};
      ${linkUseLineColorsMixin(
        t.linkLineBorderBottomColorSuccess,
        t.linkLineHoverBorderBottomColorSuccess,
        t.linkLineActiveBorderBottomColorSuccess,
        globalClasses.text,
      )};
    `;
  },

  useDanger(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkDangerColor, t.linkDangerHoverColor, t.linkDangerActiveColor)};
      ${linkUseLineColorsMixin(
        t.linkLineBorderBottomColorDanger,
        t.linkLineHoverBorderBottomColorDanger,
        t.linkLineActiveBorderBottomColorDanger,
        globalClasses.text,
      )};
    `;
  },

  useGrayed(t: Theme) {
    return css`
      ${linkUseColorsMixin(t.linkGrayedColor, t.linkGrayedHoverColor, t.linkGrayedActiveColor)};
      ${linkUseLineColorsMixin(
        t.linkLineBorderBottomColorGrayed,
        t.linkLineHoverBorderBottomColorGrayed,
        t.linkLineActiveBorderBottomColorGrayed,
        globalClasses.text,
      )};
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
