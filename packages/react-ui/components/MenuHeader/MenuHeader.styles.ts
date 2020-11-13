import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      color: ${t.menuHeaderColor};
      cursor: default;
      font-size: ${t.menuHeaderFontSize};
      padding: ${t.menuHeaderPaddingTopY} ${t.menuHeaderPaddingX} ${t.menuHeaderPaddingBottomY};
    `;
  },

  withLeftPadding(t: Theme) {
    return css`
      padding-left: ${t.menuItemPaddingForIcon};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
