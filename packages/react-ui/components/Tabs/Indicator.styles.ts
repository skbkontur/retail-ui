import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root(t: Theme) {
    return css`
      background: ${t.tabColorFocus};
      height: ${t.tabBorderWidth};
      position: absolute;
      transition: all 0.2s ease-out;
      border-radius: ${t.tabIndicatorBorderRadius};
    `;
  },

  primary(t: Theme) {
    return css`
      background: ${t.tabColorPrimary};
    `;
  },

  success(t: Theme) {
    return css`
      background: ${t.tabColorSuccess};
    `;
  },

  warning(t: Theme) {
    return css`
      background: ${t.tabColorWarning};
    `;
  },

  error(t: Theme) {
    return css`
      background: ${t.tabColorError};
    `;
  },

  customizationExample() {
    return css`
      height: 5px;
      background-color: orange;
    `;
  },
}));
