import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    container() {
      return emotion.css`
        display: inline-flex;
        position: relative;
        font-size: inherit;
        flex: 100% 1 1;
      `;
    },
    inputMask(t: Theme) {
      return emotion.css`
        color: ${t.placeholderColor};
        pointer-events: none;
        font-size: inherit;
        z-index: 5;
        user-select: none;
      `;
    },
    inputMaskLeft() {
      return emotion.css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      `;
    },
  });
