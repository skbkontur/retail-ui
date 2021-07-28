import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      display: inline-block;
      margin: 0 -${t.tabsMarginX};
      padding: 0;
      position: relative;
    `;
  },

  vertical() {
    return css`
      margin: 0;
    `;
  },
});
