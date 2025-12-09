import type { Emotion } from '@emotion/css/types/create-instance';

import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
import { memoizeGetStyles } from '../../lib/theming/Emotion';

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
