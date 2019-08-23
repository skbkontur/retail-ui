import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
    return css`
      background: ${t.toastBg};
      color: ${t.toastColor};
    `;
  },

  link(t: ITheme) {
    return css`
      color: ${t.toastLinkColor};
    `;
  },

  close(t: ITheme) {
    return css`
      color: ${t.toastCloseColor};

      &:hover {
        color: ${t.toastCloseHoverColor};
      }
    `;
  },
};

export default jsStyles;
