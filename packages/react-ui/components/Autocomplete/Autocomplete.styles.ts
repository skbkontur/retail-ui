import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      display: inline-block;
      width: ${t.inputWidth};
    `;
  },
  noPortal() {
    return css`
      position: relative;
    `;
  },
});
