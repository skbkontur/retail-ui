import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  cross(t: ITheme) {
    return css`
      fill: ${t.tooltipCloseBtnColor};

      &:hover {
        fill: ${t.tooltipCloseBtnHoverColor};
      }
    `;
  },
};

export default jsStyles;
