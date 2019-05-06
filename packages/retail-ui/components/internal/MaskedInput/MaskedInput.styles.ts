import { css } from 'emotion';
import { ITheme } from '../../../lib/theming/Theme';

const jsStyles = {
  inputMask(t: ITheme) {
    return css`
      color: ${t.placeholderColor};
    `;
  },
};

export default jsStyles;
