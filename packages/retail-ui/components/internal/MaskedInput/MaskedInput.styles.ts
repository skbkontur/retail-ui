import { css } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

export const jsStyles = {
  inputMask(t: Theme) {
    return css`
      color: ${t.placeholderColor};
    `;
  },
};
