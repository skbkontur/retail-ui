import type { Emotion } from '@emotion/css/create-instance';

import { prefix, memoizeGetStyles } from '../../../lib/theming/Emotion.js';

export const globalClasses = prefix('colorable')({
  input: 'input',
});

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root() {
    return css`
      &.${globalClasses.input} {
        display: inline-block;
        background-color: transparent;
        background-size: 100%;
        background-repeat: repeat;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `;
  },
}));
