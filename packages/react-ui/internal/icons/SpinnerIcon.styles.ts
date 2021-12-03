import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  root() {
    return css`
      display: inline-block;
      margin-left: -1px;
      margin-right: -1px;
      margin-left: -0.0714285714285714em;
      margin-right: -0.0714285714285714em;
    `;
  },
  rootInline() {
    return css`
      margin-left: -0.0714285714285714em;
      margin-right: -0.0714285714285714em;
    `;
  },

  icon() {
    return css`
      margin-bottom: -3px;
    `;
  },

  iconInline() {
    return css`
      height: 1.1428571428571428em;
      width: 1.1428571428571428em;
      margin-bottom: -0.1428571428571428em;
      stroke-width: 0.1428571428571428em;
    `;
  },
});
