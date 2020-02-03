import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  warning(t: Theme) {
    return css`
      color: ${t.warningText};
    `;
  },

  error(t: Theme) {
    return css`
      color: ${t.errorText};
    `;
  },
};
