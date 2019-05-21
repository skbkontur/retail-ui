import { css } from 'emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  cloudBgPath(t: ITheme) {
    return css`
      stroke: ${t.spinnerBgColor};
    `;
  },
  dimmed(t: ITheme) {
    return css`
      stroke: ${t.spinnerDimmedColor};
    `;
  },

  caption(t: ITheme) {
    return css`
      color: ${t.spinnerCaptionColor};
    `;
  },
};

export default jsStyles;
