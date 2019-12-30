import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  active(t: ITheme) {
    return css`
      background: ${t.loaderBg};
    `;
  },
};
