import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
    return css`
      & ::selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
      & ::-moz-selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
    `;
  },

  mask(t: ITheme) {
    return css`
      color: ${t.dateInputMaskColor};
    `;
  },

  delimiter(t: ITheme) {
    return css`
      color: ${t.dateInputMaskColor};
    `;
  },
};

export default jsStyles;
