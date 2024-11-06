import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        cursor: text;
      `;
    },

    selected(t: Theme) {
      const getSelection = (background: string, color: string) =>
        (background || color) &&
        `& ::selection {
      background: ${background};
      color: ${color};
    }`;

      return emotion.css`
        cursor: text;

        ${getSelection(t.dateInputComponentSelectedBgColor, t.dateInputComponentSelectedTextColor)}
      `;
    },

    mask(t: Theme) {
      return emotion.css`
        color: ${t.dateInputMaskColor};
      `;
    },

    delimiterFilled() {
      return emotion.css`
        color: inherit;
      `;
    },
  });
