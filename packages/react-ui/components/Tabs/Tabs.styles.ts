import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';
import type { SizeProp } from '../../lib/types/props';

import { paddingX } from './helpers';

export const getStyles = memoizeGetStyles((emotion: Emotion) => ({
  rootSmall(t: Theme) {
    return emotion.css`
        ${tabsRoot(t, 'small', emotion)}
      `;
  },

  rootMedium(t: Theme) {
    return emotion.css`
        ${tabsRoot(t, 'medium', emotion)}
      `;
  },

  rootLarge(t: Theme) {
    return emotion.css`
        ${tabsRoot(t, 'large', emotion)}
      `;
  },

  vertical() {
    return emotion.css`
        margin: 0;
      `;
  },
}));

function tabsRoot(t: Theme, size: SizeProp, { css }: Emotion) {
  return css`
    display: inline-block;
    margin: 0 -${paddingX(t, size)};
    padding: 0;
    position: relative;
  `;
}
