import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { menuHeaderSizeMixin, withIconSizeMixin } from './MenuHeader.mixins';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        color: ${t.menuHeaderColor};
        cursor: default;
      `;
    },

    rootSmall(t: Theme) {
      return emotion.css`
        ${menuHeaderSizeMixin(emotion)(
          t.menuHeaderPaddingXSmall,
          t.menuHeaderFontSizeSmall,
          t.menuHeaderLineHeightSmall,
          t.menuHeaderPaddingTopSmall,
          t.menuHeaderPaddingBottomSmall,
        )};
      `;
    },
    rootMedium(t: Theme) {
      return emotion.css`
        ${menuHeaderSizeMixin(emotion)(
          t.menuHeaderPaddingXMedium,
          t.menuHeaderFontSizeMedium,
          t.menuHeaderLineHeightMedium,
          t.menuHeaderPaddingTopMedium,
          t.menuHeaderPaddingBottomMedium,
        )};
      `;
    },
    rootLarge(t: Theme) {
      return emotion.css`
        ${menuHeaderSizeMixin(emotion)(
          t.menuHeaderPaddingXLarge,
          t.menuHeaderFontSizeLarge,
          t.menuHeaderLineHeightLarge,
          t.menuHeaderPaddingTopLarge,
          t.menuHeaderPaddingBottomLarge,
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
