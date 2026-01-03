import type { Emotion } from '@emotion/css/create-instance';

import type { Theme } from '../../lib/theming/Theme.js';

export const getStyles = (
  emotion: Emotion,
): {
  icon(t: Theme): string;
  iconSmall(t: Theme): string;
  iconMedium(t: Theme): string;
  iconLarge(t: Theme): string;
  iconDisabled(t: Theme): string;
  value(): string;
  valueVisible(): string;
} => ({
  icon(t: Theme) {
    return emotion.css`
      cursor: pointer;
      color: ${t.dateInputIconColor};
    `;
  },

  iconSmall(t: Theme) {
    return emotion.css`
      font-size: ${t.inputFontSizeSmall};
    `;
  },

  iconMedium(t: Theme) {
    return emotion.css`
      font-size: ${t.inputFontSizeMedium};
    `;
  },

  iconLarge(t: Theme) {
    return emotion.css`
      font-size: ${t.inputFontSizeLarge};
    `;
  },

  iconDisabled(t: Theme) {
    return emotion.css`
      cursor: default;
      color: ${t.textColorDisabled};
    `;
  },

  value() {
    return emotion.css`
      visibility: hidden;
    `;
  },

  valueVisible() {
    return emotion.css`
      visibility: visible;
    `;
  },
});
