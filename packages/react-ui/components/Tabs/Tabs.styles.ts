import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { TabSize } from './Tab';
import { paddingX } from './helpers';

export const styles = memoizeStyle({
  rootSmall(t: Theme) {
    return cssRoot(t, 'small');
  },

  rootMedium(t: Theme) {
    return cssRoot(t, 'medium');
  },

  rootLarge(t: Theme) {
    return cssRoot(t, 'large');
  },

  vertical() {
    return css`
      margin: 0;
    `;
  },
});

function cssRoot(t: Theme, size: TabSize) {
  return css`
    display: inline-block;
    margin: 0 -${paddingX(t, size)};
    padding: 0;
    position: relative;
  `;
}
