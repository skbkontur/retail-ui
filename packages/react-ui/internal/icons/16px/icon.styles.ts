import { css, memoizeStyle } from '../../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: inline-block;
      margin-left: -0.0714285714285714em;
      margin-right: -0.0714285714285714em;
    `;
  },

  icon() {
    return css`
      height: 1.1428571428571428em;
      width: 1.1428571428571428em;
      margin-bottom: -0.1428571428571428em;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
