import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { is8pxTheme } from '../../lib/theming/ThemeHelpers';
import { emotionMQS } from '../../lib/client';

const styles = {
  root(t: Theme) {
    return css`
      background: ${t.menuBgDefault};
      box-sizing: content-box;
      overflow: auto;
      padding: ${is8pxTheme(t) ? 0 : t.menuPaddingY} 0;
    `;
  },

  scrollContainer(t: Theme) {
    return css`
      padding: ${is8pxTheme(t) ? t.menuPaddingY : 0} 0;
    `;
  },

  shadow(t: Theme) {
    return css`
      border: ${t.menuBorder};
      box-shadow: ${t.menuShadow};

      ${emotionMQS.sm}  {
        box-shadow: none;
      },
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
