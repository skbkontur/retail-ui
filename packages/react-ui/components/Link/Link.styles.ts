import { css, cssName, keyframes, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { linkMixin, linkDisabledMixin, linkUseColorsMixin } from './Link.mixins';

const styles = {
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

  buttonOpened() {
    return css`
      background: #e1e1e1;
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

  focus(t: Theme) {
    return css`
      ${cssName(styles.root(t))}& {
        text-decoration: ${t.linkHoverTextDecoration};
      }
      ${cssName(styles.useGrayed(t))}& {
        color: ${t.linkDisabledColor};
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      ${linkDisabledMixin()};

      ${cssName(styles.root(t))}& {
        color: ${t.linkDisabledColor};

        &:hover {
          color: ${t.linkDisabledColor};
        }
      }
    `;
  },

  icon(t: Theme) {
    return css`
      display: inline-block;
      margin-right: ${t.linkIconMarginRight};
    `;
  },

  loading() {
    return css`
      position: absolute;
      top: 0;
      left: 0;
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      visibility: visible !important;
    `;
  },

  loadingAnimate() {
    const underlineAnimation = keyframes`
      0% { background-position-x: 0% ; }
      100% { background-position-x: 140%; }
    `;

    return css`
      &:before {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 1.5px;
        background: linear-gradient(to right, #30724c 0%, #d6e3f3 50%, #30724c 60%, #d6e3f3 100%);
        background-size: 400% 400%;
        animation: ${underlineAnimation} 2s linear infinite reverse;
      }
    `;
  },

  lowOpacity() {
    return css`
      opacity: 0.3;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
