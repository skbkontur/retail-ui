import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  error(t: Theme) {
    return css`
      box-shadow: 0 0 0 2px ${t.borderColorError};
    `;
  },
};
