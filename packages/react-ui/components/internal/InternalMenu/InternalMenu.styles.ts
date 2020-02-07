import { css } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      background: ${t.bgDefault};
    `;
  },
};
