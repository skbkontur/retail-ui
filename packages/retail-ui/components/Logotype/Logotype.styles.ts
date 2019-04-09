import { css } from 'emotion';
import { ITheme } from '../../lib/ThemeManager';

const jsStyles = {
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

export default jsStyles;
