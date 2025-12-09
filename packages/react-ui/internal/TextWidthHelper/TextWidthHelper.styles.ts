import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root() {
    return css`
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
    return css`
      word-break: break-all;
      white-space: nowrap;
    `;
  },
}));
