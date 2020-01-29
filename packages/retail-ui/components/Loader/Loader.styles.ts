import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  active(t: Theme) {
    return css`
      background: ${t.loaderBg};
    `;
  },
};
