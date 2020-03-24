import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
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
};
