import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    calendarRoot() {
      return emotion.css`
      width: auto;
    `;
    },
  });
