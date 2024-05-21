import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        margin: ${t.menuSeparatorMarginY} ${t.menuSeparatorMarginX};
        border-top: ${t.menuSeparatorBorderWidth} solid ${t.menuSeparatorBorderColor};
      `;
    },

    rootMobile(t: Theme) {
      return emotion.css`
        margin: ${t.mobileMenuSeparatorMarginY} ${t.mobileMenuSeparatorMarginX};
        border-radius: 1px;
      `;
    },
  });
