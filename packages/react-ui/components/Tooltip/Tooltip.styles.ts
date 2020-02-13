import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  cross(t: Theme) {
    return css`
      color: ${t.tooltipCloseBtnColor};

      &:hover {
        color: ${t.tooltipCloseBtnHoverColor};
      }
    `;
  },
};
