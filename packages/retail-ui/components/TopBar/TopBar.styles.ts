import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: ITheme) {
    return css`
      background: ${t.tbBg};
      box-shadow: ${t.tbShadow};
    `;
  },

  divider(t: ITheme) {
    return css`
      background-color: ${t.tdDividerBg};
    `;
  },

  noShadow() {
    return css`
      box-shadow: none;
    `;
  },
};
