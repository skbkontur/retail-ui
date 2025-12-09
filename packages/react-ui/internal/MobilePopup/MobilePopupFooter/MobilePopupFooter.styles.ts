import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../../lib/theming/Emotion';
import type { Theme } from '../../../lib/theming/Theme';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root(t: Theme) {
    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      padding: ${t.mobilePopupHeaderPadding};
    `;
  },
}));
