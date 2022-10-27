import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      margin: ${t.menuSeparatorMarginY} 0;
      border-top: ${t.menuSeparatorBorderWidth} solid ${t.menuSeparatorBorderColor};
      border-radius: 1px;
    `;
  },

  rootMobile(t: Theme) {
    return css`
      margin: ${t.menuSeparatorMarginY} 16px;
    `;
  },
});
