import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      position: relative;

      &:after {
        content: '';
        position: absolute;
        width: calc(100% - 0.1em);
        height: 1px;
        left: 0.05em;
        bottom: 0.11em;
        border-bottom: solid 0.05em;
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
