import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: ITheme) {
    return css`
      color: ${t.logoColor};

      &:hover {
        color: ${t.logoHoverColor};
      }
    `;
  },

  divider(t: ITheme) {
    return css`
      background-color: ${t.tdDividerBg};
    `;
  },
};
