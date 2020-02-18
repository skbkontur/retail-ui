import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      background: ${t.tabColorFocus};
      height: 3px;
      position: absolute;
      transition: all 0.2s ease-out;
    `;
  },

  primary(t: Theme) {
    return css`
      background: ${t.tabColorPrimary};
    `;
  },

  success(t: Theme) {
    return css`
      background: ${t.tabColorSuccess};
    `;
  },

  warning(t: Theme) {
    return css`
      background: ${t.tabColorWarning};
    `;
  },

  error(t: Theme) {
    return css`
      background: ${t.tabColorError};
    `;
  },
};
