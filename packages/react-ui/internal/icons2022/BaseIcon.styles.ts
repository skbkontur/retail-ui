import type { Emotion } from '@emotion/css/create-instance';

import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    centeredIcon() {
      return emotion.css`
        display: inline-flex;
        align-items: center;

        &::before {
          content: '${ZERO_WIDTH_SPACE_CSS}';
        }
      `;
    },
  });
