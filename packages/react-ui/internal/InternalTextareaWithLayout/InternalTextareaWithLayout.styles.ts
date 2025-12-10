import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  contentWrapper() {
    return css`
      display: inline-flex;
      align-items: flex-start;
    `;
  },
}));
