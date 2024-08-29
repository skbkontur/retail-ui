import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    wrapper() {
      return emotion.css`
        &:not(:first-child) {
          margin-top: 20px;
        }
      `;
    },
    componentName() {
      return emotion.css`
        font-weight: 700;
        font-size: 1.25em;
        margin: 0 5px 5px;
      `;
    },
    row() {
      return emotion.css`
        display: flex;
        width: 100%;
        font-size: 16px;
      `;
    },

    leftCell() {
      return emotion.css`
        padding: 5px;
        border-right: 1px solid #dadada;
        border-bottom: 1px solid #dadada;
        width: 30%;
        overflow-wrap: anywhere;
      `;
    },
    rightCell() {
      return emotion.css`
        padding: 5px;
        border-bottom: 1px solid #dadada;
        width: 70%;
      `;
    },
  });
