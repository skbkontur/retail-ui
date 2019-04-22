import { css } from 'emotion';
import { ITheme } from '../../lib/ThemeManager';

const jsStyles = {
  root(t: ITheme) {
    return css`
      background: ${t.borderColorFocus};
    `;
  },

  primary(t: ITheme) {
    return css`
      background: ${t.btnPrimaryBg};
    `;
  },

  success(t: ITheme) {
    return css`
      background: ${t.btnSuccessBg};
    `;
  },

  warning(t: ITheme) {
    return css`
      background: ${t.btnPayBg};
    `;
  },

  error(t: ITheme) {
    return css`
      background: ${t.btnDangerBg};
    `;
  },
};

export default jsStyles;
