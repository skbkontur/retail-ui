import { css } from 'emotion';
import { ITheme } from '../../lib/ThemeManager';

const jsStyles = {
  root(t: ITheme) {
    return css`
      border-top: 1px solid ${t.menuSeparatorBorderColor};
    `;
  },
};

export default jsStyles;
