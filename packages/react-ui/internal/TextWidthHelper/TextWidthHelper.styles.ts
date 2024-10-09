import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      visibility: hidden;
      overflow: hidden;
    `;
    },
    textContainer() {
      return emotion.css`
      word-break: break-all;
      white-space: nowrap;
    `;
    },
  });
