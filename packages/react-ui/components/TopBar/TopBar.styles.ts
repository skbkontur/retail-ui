import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      background: ${t.tbBg};
      box-shadow: ${t.tbShadow};
    `;
  },

  divider(t: Theme) {
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
