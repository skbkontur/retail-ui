import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  calendarRoot() {
    return css`
      width: auto;
    `;
  },
}));
