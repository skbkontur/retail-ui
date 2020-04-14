import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      color: ${t.menuHeaderTextColor};
      cursor: default;
      font-size: ${t.menuHeaderFontSize};
      line-heigh: ${t.menuHeaderLineHeight};
      padding: ${t.menuHeaderPadding};
    `;
  },

  withLeftPadding(t: Theme) {
    return css`
      padding-left: ${t.menuHeaderPaddingForIcon};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
