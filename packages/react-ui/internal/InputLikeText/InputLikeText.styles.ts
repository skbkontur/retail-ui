import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root() {
    return css`
      padding-right: 10px;
    `;
  },

  absolute() {
    return css`
      position: absolute;
      top: 0;
    `;
  },

  wrapperMultiline() {
    return css`
      overflow-wrap: anywhere;
      white-space: normal;
      overflow: visible;
    `;
  },

  userSelectContain() {
    return css`
      user-select: text;
      -ms-user-select: element;
    `;
  },

  userSelectNone() {
    return css`
      user-select: none;
    `;
  },

  rightSide() {
    return css`
      padding-left: 0;
      visibility: visible;
    `;
  },
}));
