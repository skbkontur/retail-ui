import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      overflow: auto;
      padding: 5px 0;
      outline: none;
      background: ${t.bgDropdownDefault};
    `;
  },

  shadow(t: Theme) {
    return css`
      border: ${t.menuBorder};
      box-shadow: ${t.menuShadow};
    `;
  },

  header() {
    return css`
      top: -5px;
      position: relative;
      z-index: 1;
      width: 100%;
      overflow: hidden;
      line-height: 18px;
      box-sizing: border-box;
      padding: 6px 18px 7px 8px;
    `;
  },

  footer() {
    return css`
      bottom: -5px;
      position: relative;
      z-index: 1;
      width: 100%;
      overflow: hidden;
      line-height: 18px;
      box-sizing: border-box;
      padding: 6px 18px 7px 8px;
    `;
  },

  fixedHeader() {
    return css`
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    `;
  },

  fixedFooter() {
    return css`
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
    `;
  },
});
