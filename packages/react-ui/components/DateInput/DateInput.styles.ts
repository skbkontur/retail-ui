import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) => ({
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
