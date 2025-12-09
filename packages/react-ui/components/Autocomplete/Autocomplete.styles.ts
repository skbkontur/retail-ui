import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root(t: Theme) {
    return css`
      display: inline-block;
      width: ${t.inputWidth};
    `;
  },
  noPortal() {
    return css`
      position: relative;
    `;
  },
}));
