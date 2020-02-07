import { css } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      padding-right: 10px;
    `;
  },

  input(t: Theme) {
    return css`
      position: absolute;
      top: 0;
    `;
  },

  userSelectContain(t: Theme) {
    return css`
      user-select: text;
      -ms-user-select: element;
    `;
  },

  userSelectNone(t: Theme) {
    return css`
      user-select: none;
    `;
  },

  withoutLeftSide(t: Theme) {
    return css`
      padding-left: 10px;
    `;
  },
};
