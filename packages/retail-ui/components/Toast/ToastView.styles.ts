import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      background: ${t.toastBg};
      color: ${t.toastColor};
    `;
  },

  link(t: Theme) {
    return css`
      color: ${t.toastLinkColor};
    `;
  },

  close(t: Theme) {
    return css`
      color: ${t.toastCloseColor};

      &:hover {
        color: ${t.toastCloseHoverColor};
      }
    `;
  },
};
