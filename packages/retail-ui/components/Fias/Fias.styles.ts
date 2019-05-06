import { css } from 'emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  warning(t: ITheme) {
    return css`
      color: ${t.warningText};
    `;
  },

  error(t: ITheme) {
    return css`
      color: ${t.errorText};
    `;
  },
};

export default jsStyles;
