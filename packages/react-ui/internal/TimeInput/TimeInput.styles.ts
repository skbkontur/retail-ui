import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  rightIcon() {
    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      user-select: none;
    `;
  },

  rightIconInteractive() {
    return css`
      cursor: pointer;
    `;
  },

  rightIconDefault(t: Theme) {
    return css`
      color: ${t.textColorDefault};
    `;
  },
}));
