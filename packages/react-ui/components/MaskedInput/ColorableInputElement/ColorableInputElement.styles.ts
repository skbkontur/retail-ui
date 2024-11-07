import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../../lib/theming/Emotion';

export const globalClasses = prefix('colorable')({
  input: 'input',
});

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    input() {
      return emotion.css`
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
  });
