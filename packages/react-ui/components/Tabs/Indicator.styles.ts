import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        background: ${t.tabColorFocus};
        height: ${t.tabBorderWidth};
        position: absolute;
        transition: all 0.2s ease-out;
        border-radius: ${t.tabIndicatorBorderRadius};
      `;
    },

    primary(t: Theme) {
      return emotion.css`
        background: ${t.tabColorPrimary};
      `;
    },

    success(t: Theme) {
      return emotion.css`
        background: ${t.tabColorSuccess};
      `;
    },

    warning(t: Theme) {
      return emotion.css`
        background: ${t.tabColorWarning};
      `;
    },

    error(t: Theme) {
      return emotion.css`
        background: ${t.tabColorError};
      `;
    },
  });
