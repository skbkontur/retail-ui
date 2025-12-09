import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  contentWrapper() {
    return css`
      display: inline-flex;
      align-items: flex-start;
    `;
  },
}));
