import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root(t: Theme) {
    return css`
      margin: ${t.menuSeparatorMarginY} ${t.menuSeparatorMarginX};
      border-top: ${t.menuSeparatorBorderWidth} solid ${t.menuSeparatorBorderColor};
    `;
  },

  rootMobile(t: Theme) {
    return css`
      margin: ${t.mobileMenuSeparatorMarginY} ${t.mobileMenuSeparatorMarginX};
      border-radius: 1px;
    `;
  },
}));
