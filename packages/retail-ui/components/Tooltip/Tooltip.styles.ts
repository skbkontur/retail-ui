import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  cross(t: ITheme) {
    return css`
      color: ${t.tooltipCloseBtnColor};

      &:hover {
        color: ${t.tooltipCloseBtnHoverColor};
      }
    `;
  },
};
