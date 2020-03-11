import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  wrap() {
    return css`
      display: inline-block;
      vertical-align: middle;
    `;
  },

  input() {
    return css`
      height: 0;
      opacity: 0;
      position: absolute;
      width: 0;
    `;
  },

  label() {
    return css`
      margin-right: 15px;
      vertical-align: middle;
      display: inline-block;
    `;
  },

  error(t: Theme) {
    return css`
      border-radius: 2px;
      box-shadow: 0 0 0 2px ${t.borderColorError};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
