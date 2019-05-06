import { css } from 'emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  error(t: ITheme) {
    return css`
      box-shadow: 0 0 0 2px ${t.errorMain};
    `;
  },
};

export default jsStyles;
