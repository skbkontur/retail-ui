import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { linkMixin, linkDisabledMixin, linkUseColorsMixin } from './Link.mixins';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      ${linkMixin(t.linkHoverTextDecoration)};
      position: relative;
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
      ${linkUseColorsMixin(t.linkDisabledColor, t.linkDisabledColor, t.linkDisabledColor)};
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

      color: ${t.linkDisabledColor};

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
