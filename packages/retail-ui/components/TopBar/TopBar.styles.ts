import { css } from 'emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
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
};

export default jsStyles;
