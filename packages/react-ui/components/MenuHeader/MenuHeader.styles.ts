import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    const legacyPaddingRight = parseFloat(t.menuHeaderLegacyPaddingRight);
    const paddingRight =
      legacyPaddingRight !== 0 ? `${parseFloat(t.menuHeaderPaddingX) + legacyPaddingRight}px` : t.menuHeaderPaddingX;

    return css`
      color: ${t.menuHeaderColor};
      cursor: default;
      font-size: ${t.menuHeaderFontSize};
      line-height: ${t.menuHeaderLineHeight};
      padding: ${t.menuHeaderPaddingTop} ${paddingRight} ${t.menuHeaderPaddingBottom} ${t.menuHeaderPaddingX};
    `;
  },

  withLeftPadding(t: Theme) {
    return css`
      padding-left: ${t.menuItemPaddingForIcon};
    `;
  },
});
