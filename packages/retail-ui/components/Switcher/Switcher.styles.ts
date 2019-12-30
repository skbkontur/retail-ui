import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  error(t: ITheme) {
    return css`
      box-shadow: 0 0 0 2px ${t.borderColorError};
    `;
  },
};
