import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      display: inline-block;
      margin: 0 -${t.tabsMarginX};
      padding: 0;
      position: relative;
    `;
  },

  vertical(t: Theme) {
    return css`
      margin: 0;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
