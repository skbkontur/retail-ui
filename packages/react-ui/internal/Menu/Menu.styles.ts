import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      background: ${t.menuBgDefault};
      border-radius: ${t.menuBorderRadius};
      box-sizing: content-box;
      overflow: auto;
      padding: 0 ${t.menuPaddingX};
      margin: ${t.menuOffsetY} 0;
      border-radius: ${t.menuBorderRadius};
    `;
  },

  alignRight() {
    return css`
      flex: 1 1 100%;
    `;
  },

  alignRightIE11() {
    return css`
      float: right;
      width: 100%;
    `;
  },

  alignRightIE11FixAutoWidth() {
    return css`
      box-sizing: border-box !important; // override root styles
      overflow: hidden !important; // override root styles
    `;
  },

  scrollContainer(t: Theme) {
    return css`
      padding: ${t.menuPaddingY} 0;
    `;
  },

  shadow(t: Theme) {
    return css`
      border: ${t.menuBorder};
      box-shadow: ${t.menuShadow};
    `;
  },
});
