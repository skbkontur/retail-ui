import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  caption() {
    return css`
      display: inline-block;
      width: 100%;
    `;
  },
  container() {
    return css`
      display: inline-block;
      line-height: normal;
    `;
  },
}));
