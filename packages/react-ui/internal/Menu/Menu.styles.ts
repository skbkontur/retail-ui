import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      background: ${t.menuBgDefault};
      box-sizing: content-box;
      overflow: auto;
      padding: 0 0;
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
