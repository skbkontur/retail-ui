import { css } from '../../../lib/theming/Emotion';
import { ITheme } from '../../../lib/theming/Theme';

export const jsStyles = {
  inputMask(t: ITheme) {
    return css`
      color: ${t.placeholderColor};
    `;
  },
};
