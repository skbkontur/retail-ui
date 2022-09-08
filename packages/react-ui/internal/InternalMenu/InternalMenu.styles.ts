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
    `;
  },

  header() {
    return css`
      line-height: 18px;
      box-sizing: border-box;
      padding: 6px 18px 7px 8px;
    `;
  },

  footer() {
    return css`
      line-height: 18px;
      box-sizing: border-box;
      padding: 6px 18px 7px 8px;
    `;
  },
});
