import type { Emotion } from '@emotion/css/create-instance';

import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars.js';
import { memoizeGetStyles } from '../../lib/theming/Emotion.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  centeredIcon() {
    return css`
      display: inline-flex;
      align-items: center;

      &::before {
        content: '${ZERO_WIDTH_SPACE_CSS}';
      }
    `;
  },
}));
