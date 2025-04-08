import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
      position: relative;
      display: flex;
      flex-direction: column;
      padding: ${t.mobilePopupHeaderPadding};
    `;
    },
  });
