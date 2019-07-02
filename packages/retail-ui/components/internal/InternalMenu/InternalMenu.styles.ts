import { css } from '../../../lib/theming/Emotion';
import { ITheme } from '../../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
    return css`
      background: ${t.bgDefault};
    `;
  },
};

export default jsStyles;
