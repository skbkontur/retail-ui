import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

import { menuHeaderSizeMixin, withIconSizeMixin } from './MenuHeader.mixins';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      color: ${t.menuHeaderColor};
      cursor: default;
    `;
  },

  rootSmall(t: Theme) {
    return css`
      ${menuHeaderSizeMixin(
        t.menuHeaderPaddingXSmall,
        t.menuHeaderFontSizeSmall,
        t.menuHeaderLineHeightSmall,
        t.menuHeaderPaddingTopSmall,
        t.menuHeaderPaddingBottomSmall,
      )};
    `;
  },
  rootMedium(t: Theme) {
    return css`
      ${menuHeaderSizeMixin(
        t.menuHeaderPaddingXMedium,
        t.menuHeaderFontSizeMedium,
        t.menuHeaderLineHeightMedium,
        t.menuHeaderPaddingTopMedium,
        t.menuHeaderPaddingBottomMedium,
      )};
    `;
  },
  rootLarge(t: Theme) {
    return css`
      ${menuHeaderSizeMixin(
        t.menuHeaderPaddingXLarge,
        t.menuHeaderFontSizeLarge,
        t.menuHeaderLineHeightLarge,
        t.menuHeaderPaddingTopLarge,
        t.menuHeaderPaddingBottomLarge,
      )};
    `;
  },

  withLeftPaddingSmall(t: Theme) {
    return css`
      ${withIconSizeMixin(t.menuItemPaddingForIconSmall)}
    `;
  },
  withLeftPaddingMedium(t: Theme) {
    return css`
      ${withIconSizeMixin(t.menuItemPaddingForIconMedium)}
    `;
  },
  withLeftPaddingLarge(t: Theme) {
    return css`
      ${withIconSizeMixin(t.menuItemPaddingForIconLarge)}
    `;
  },
});
