import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root() {
    return css`
      display: inline-flex;
      line-height: normal;
    `;
  },

  wrappedChildren() {
    return css`
      display: flex;
    `;
  },

  fixed() {
    return css`
      flex-shrink: 0;
      display: inline-block;
    `;
  },

  stretch() {
    return css`
      flex-grow: 1;
      flex-shrink: 1;
    `;
  },

  item() {
    return css`
      margin-left: -1px;
    `;
  },

  itemFirst() {
    return css`
      margin-left: 0;
    `;
  },
}));
