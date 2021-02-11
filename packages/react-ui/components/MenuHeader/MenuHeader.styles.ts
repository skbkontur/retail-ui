import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root() {
    return css`
      color: #a0a0a0;
      cursor: default;
      font-size: 12px;
      padding: 6px 18px 7px 8px;
    `;
  },

  withLeftPadding(t: Theme) {
    return css`
      padding-left: ${t.menuItemPaddingForIcon};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
