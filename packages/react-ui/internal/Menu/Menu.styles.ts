import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      background: ${t.menuBgDefault};
      box-sizing: content-box;
      overflow: auto;
      padding: 5px 0;
    `;
  },

  shadow(t: Theme) {
    return css`
      border: ${t.menuBorder};
      box-shadow: ${t.menuShadow};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
