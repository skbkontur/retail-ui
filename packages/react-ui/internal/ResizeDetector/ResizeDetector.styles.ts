import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root() {
    return css`
      position: relative;
      height: 100%;
    `;
  },

  iframe() {
    return css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border: 0;
      background: transparent;
      opacity: 0;
    `;
  },

  content() {
    return css`
      position: relative;
    `;
  },

  fullHeight() {
    return css`
      height: 100%;
    `;
  },

  flex() {
    return css`
      display: flex;
    `;
  },
}));
