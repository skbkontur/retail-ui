import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
    return css`
      border-top: 1px solid ${t.menuSeparatorBorderColor};
    `;
  },
};

export default jsStyles;
