import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { SizeProp } from '../../lib/types/props';

import { paddingX } from './helpers';

export const getStyles = (emotion: Emotion) => {
  function tabsRoot(t: Theme, size: SizeProp) {
    return emotion.css`
    display: inline-block;
    margin: 0 -${paddingX(t, size)};
    padding: 0;
    position: relative;
  `;
  }

  return memoizeStyle({
    rootSmall(t: Theme) {
      return tabsRoot(t, 'small');
    },

    rootMedium(t: Theme) {
      return tabsRoot(t, 'medium');
    },

    rootLarge(t: Theme) {
      return tabsRoot(t, 'large');
    },

    vertical() {
      return emotion.css`
        margin: 0;
      `;
    },
  });
};
