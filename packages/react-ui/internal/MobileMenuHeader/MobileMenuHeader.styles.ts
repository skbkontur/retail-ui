import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

const styles = {
  root(t: Theme) {
    return css`
      position: relative;
      background: ${t.menuBgDefault};
      padding: ${t.mobileMenuHeaderPadding};
      border-radius: ${t.mobileMenuHeaderBorderRadius};
    `;
  },

  withShadow(t: Theme) {
    return css`
      box-shadow: ${t.mobileMenuHeaderShadow};
    `;
  },
  container() {
    return css`
      position: relative;
      overflow-wrap: break-word;
      word-wrap: break-word;
    `;
  },

  caption(t: Theme) {
    return css`
      font-size: ${t.mobileMenuHeaderFontSize};
      line-height: ${t.mobileMenuHeaderLineHeight};
      font-weight: ${t.mobileMenuHeaderFontWeight};
    `;
  },

  withChild(t: Theme) {
    return css`
      padding-bottom: ${t.mobileMenuHeaderChildPadding};
    `;
  },

  closeWrapper() {
    return css`
      position: relative;
      float: right;
      width: 12px;
      height: 12px;
      padding: 8px 0;
      padding-left: 17px;
    `;
  },

  close(t: Theme) {
    return css`
      ${resetButton()};
      display: flex;
      background: none;
      background: transparent;
      cursor: pointer;
      color: ${t.modalCloseButtonColor};
      text-align: center;
      vertical-align: middle;
      padding: 10px !important;
      margin: -10px !important;

      & > svg {
        width: 12px;
        height: 12px;
        box-sizing: content-box;
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
