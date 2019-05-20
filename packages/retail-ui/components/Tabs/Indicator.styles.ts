import { css } from 'emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
    return css`
      background: ${t.tabColorFocus};
    `;
  },

  primary(t: ITheme) {
    return css`
      background: ${t.btnPrimaryBg};
    `;
  },

  success(t: ITheme) {
    return css`
      background: ${t.tabColorSuccess};
    `;
  },

  warning(t: ITheme) {
    return css`
      background: ${t.tabColorWarning};
    `;
  },

  error(t: ITheme) {
    return css`
      background: ${t.tabColorError};
    `;
  },
};

export default jsStyles;
