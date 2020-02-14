import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      color: ${t.logoColor};

      &:hover {
        color: ${t.logoHoverColor};
      }
    `;
  },

  divider(t: Theme) {
    return css`
      background-color: ${t.tdDividerBg};
    `;
  },
};
