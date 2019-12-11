import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  cross(t: ITheme) {
    return css`
      color: ${t.tooltipCloseBtnColor};

      &:hover {
        color: ${t.tooltipCloseBtnHoverColor};
      }
    `;
  },
};

export default jsStyles;
