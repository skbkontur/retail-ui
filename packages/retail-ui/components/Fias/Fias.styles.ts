import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  warning(t: ITheme) {
    return css`
      color: ${t.warningText};
    `;
  },

  error(t: ITheme) {
    return css`
      color: ${t.errorText};
    `;
  },
};
