import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  icon(t: ITheme) {
    return css`
      color: ${t.dateInputIconColor};
    `;
  },

  iconSmall(t: ITheme) {
    return css`
      font-size: ${t.inputFontSizeSmall};
    `;
  },

  iconMedium(t: ITheme) {
    return css`
      font-size: ${t.inputFontSizeMedium};
    `;
  },

  iconLarge(t: ITheme) {
    return css`
      font-size: ${t.inputFontSizeLarge};
    `;
  },

  iconDisabled(t: ITheme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },
};

export default jsStyles;
