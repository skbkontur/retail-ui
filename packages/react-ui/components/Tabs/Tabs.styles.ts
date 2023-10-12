import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { SizeType } from '../../lib/SizeType';

import { paddingX } from './helpers';

export const styles = memoizeStyle({
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
    return css`
      margin: 0;
    `;
  },
});

function tabsRoot(t: Theme, size: SizeType) {
  return css`
    display: inline-block;
    margin: 0 -${paddingX(t, size)};
    padding: 0;
    position: relative;
  `;
}
