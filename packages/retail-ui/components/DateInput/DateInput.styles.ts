import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  icon(t: ITheme) {
    return css`
      color: ${t.dateInputIconColor};
    `;
  },

  iconDisabled(t: ITheme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },
};

export default jsStyles;
