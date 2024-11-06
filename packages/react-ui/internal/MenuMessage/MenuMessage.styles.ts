import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../lib/theming/Theme';
import { memoizeStyle } from '../../lib/theming/Emotion';
import { getMenuItemPaddings } from '../../components/MenuItem/MenuItem.styles';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      const { paddingX, paddingY } = getMenuItemPaddings({
        menuItemPaddingX: t.menuMessagePaddingX,
        menuItemPaddingY: t.menuMessagePaddingY,
      });

      return emotion.css`
        margin: 0;
        display: ${t.menuMessageDisplay};
        padding: ${t.menuMessagePaddingY} ${paddingX} ${paddingY} ${t.menuMessagePaddingX};
        color: ${t.menuMessageTextColor};
        background: ${t.menuMessageBg};
      `;
    },

    rootMobile(t: Theme) {
      return emotion.css`
        font-size: ${t.menuMessageFontSizeMobile};
        line-height: ${t.menuMessageLineHeightMobile};
        padding: ${t.menuMessagePaddingMobile};
      `;
    },

    rootSmall(t: Theme) {
      return emotion.css`
        font-size: ${t.menuMessageFontSizeSmall};
        line-height: ${t.menuMessageLineHeightSmall};
      `;
    },
    rootMedium(t: Theme) {
      return emotion.css`
        font-size: ${t.menuMessageFontSizeMedium};
        line-height: ${t.menuMessageLineHeightMedium};
      `;
    },
    rootLarge(t: Theme) {
      return emotion.css`
        font-size: ${t.menuMessageFontSizeLarge};
        line-height: ${t.menuMessageLineHeightLarge};
      `;
    },
  });
