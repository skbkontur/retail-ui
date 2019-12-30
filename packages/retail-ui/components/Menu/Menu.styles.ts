import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: ITheme) {
    return css`
      background: ${t.bgDefault};
    `;
  },

  shadow(t: ITheme) {
    return css`
      border: ${t.menuBorder};
      box-shadow: ${t.menuShadow};
    `;
  },
};
