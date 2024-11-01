import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      margin: ${t.menuSeparatorMarginY} ${t.menuSeparatorMarginX};
      border-top: ${t.menuSeparatorBorderWidth} solid ${t.menuSeparatorBorderColor};
    `;
  },

  rootMobile(t: Theme) {
    return css`
      margin: ${t.mobileMenuSeparatorMarginY} ${t.mobileMenuSeparatorMarginX};
      border-radius: 1px;
    `;
  },
});
