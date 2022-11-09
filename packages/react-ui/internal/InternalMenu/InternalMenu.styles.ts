import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      padding: 5px ${t.menuPaddingX};
      outline: none;
      box-sizing: content-box;
      background: ${t.bgSecondary};
    `;
  },

  shadow(t: Theme) {
    return css`
      border: ${t.menuBorder};
      box-shadow: ${t.menuShadow};
    `;
  },

  wrapper() {
    return css`
      position: relative;
      z-index: 1;
      width: 100%;
      overflow: hidden;
      line-height: 18px;
      box-sizing: border-box;
    `;
  },

  headerWrapper() {
    return css`
      top: -5px;
    `;
  },

  footerWrapper() {
    return css`
      bottom: -5px;
    `;
  },

  contentWrapper() {
    return css`
      padding: 6px 18px 7px 8px;
    `;
  },

  menuSeparatorWrapper(t: Theme) {
    return css`
      height: ${t.menuSeparatorBorderWidth};
    `;
  },
});
