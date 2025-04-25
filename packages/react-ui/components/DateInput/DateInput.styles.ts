import { css } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const styles = {
  icon(t: Theme) {
    return css`
      cursor: pointer;
      color: ${t.dateInputIconColor};
    `;
  },

  iconSmall(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeSmall};
    `;
  },

  iconMedium(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeMedium};
    `;
  },

  iconLarge(t: Theme) {
    return css`
      font-size: ${t.inputFontSizeLarge};
    `;
  },

  iconDisabled(t: Theme) {
    return css`
      cursor: default;
      color: ${t.textColorDisabled};
    `;
  },

  value() {
    return css`
      visibility: hidden;
    `;
  },

  valueVisible() {
    return css`
      visibility: visible;
    `;
  },
};
