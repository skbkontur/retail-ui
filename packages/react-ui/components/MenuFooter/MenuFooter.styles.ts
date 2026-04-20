import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { menuFooterSizeMixin, withIconSizeMixin } from './MenuFooter.mixins.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root(t: Theme) {
    return css`
      color: ${t.menuFooterColor};
      cursor: default;
    `;
  },

  rootSmall(t: Theme) {
    return css`
      ${menuFooterSizeMixin(
        t.menuFooterPaddingXSmall,
        t.menuFooterFontSizeSmall,
        t.menuFooterLineHeightSmall,
        t.menuFooterPaddingTopSmall,
        t.menuFooterPaddingBottomSmall,
      )};
    `;
  },
  rootMedium(t: Theme) {
    return css`
      ${menuFooterSizeMixin(
        t.menuFooterPaddingXMedium,
        t.menuFooterFontSizeMedium,
        t.menuFooterLineHeightMedium,
        t.menuFooterPaddingTopMedium,
        t.menuFooterPaddingBottomMedium,
      )};
    `;
  },
  rootLarge(t: Theme) {
    return css`
      ${menuFooterSizeMixin(
        t.menuFooterPaddingXLarge,
        t.menuFooterFontSizeLarge,
        t.menuFooterLineHeightLarge,
        t.menuFooterPaddingTopLarge,
        t.menuFooterPaddingBottomLarge,
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
}));
