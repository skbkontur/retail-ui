import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      margin: ${t.menuSeparatorMarginY} ${t.menuSeparatorMarginX};
      border-top: ${t.menuSeparatorBorderWidth} solid ${t.menuSeparatorBorderColor};
    `;
  },
});
