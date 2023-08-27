import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { menuHeaderSizeMixin } from './MenuHeader.mixins';

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
        t.menuHeaderLegacyPaddingRight,
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
        t.menuHeaderLegacyPaddingRight,
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
        t.menuHeaderLegacyPaddingRight,
        t.menuHeaderPaddingXLarge,
        t.menuHeaderFontSizeLarge,
        t.menuHeaderLineHeightLarge,
        t.menuHeaderPaddingTopLarge,
        t.menuHeaderPaddingBottomLarge,
      )};
    `;
  },

  withLeftPadding(t: Theme) {
    return css`
      padding-left: ${t.menuItemPaddingForIconSmall};
    `;
  },
});
