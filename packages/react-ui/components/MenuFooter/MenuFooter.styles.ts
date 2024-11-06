import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { menuFooterSizeMixin, withIconSizeMixin } from './MenuFooter.mixins';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        color: ${t.menuFooterColor};
        cursor: default;
      `;
    },

    rootSmall(t: Theme) {
      return emotion.css`
        ${menuFooterSizeMixin(emotion)(
          t.menuFooterPaddingXSmall,
          t.menuFooterFontSizeSmall,
          t.menuFooterLineHeightSmall,
          t.menuFooterPaddingTopSmall,
          t.menuFooterPaddingBottomSmall,
        )};
      `;
    },
    rootMedium(t: Theme) {
      return emotion.css`
        ${menuFooterSizeMixin(emotion)(
          t.menuFooterPaddingXMedium,
          t.menuFooterFontSizeMedium,
          t.menuFooterLineHeightMedium,
          t.menuFooterPaddingTopMedium,
          t.menuFooterPaddingBottomMedium,
        )};
      `;
    },
    rootLarge(t: Theme) {
      return emotion.css`
        ${menuFooterSizeMixin(emotion)(
          t.menuFooterPaddingXLarge,
          t.menuFooterFontSizeLarge,
          t.menuFooterLineHeightLarge,
          t.menuFooterPaddingTopLarge,
          t.menuFooterPaddingBottomLarge,
        )};
      `;
    },

    withLeftPaddingSmall(t: Theme) {
      return emotion.css`
        ${withIconSizeMixin(emotion)(t.menuItemPaddingForIconSmall)}
      `;
    },
    withLeftPaddingMedium(t: Theme) {
      return emotion.css`
        ${withIconSizeMixin(emotion)(t.menuItemPaddingForIconMedium)}
      `;
    },
    withLeftPaddingLarge(t: Theme) {
      return emotion.css`
        ${withIconSizeMixin(emotion)(t.menuItemPaddingForIconLarge)}
      `;
    },
  });
