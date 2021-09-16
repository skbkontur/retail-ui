import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      width: 100%;
      height: 100%;
      flex-direction: column;
      display: flex;
      justify-content: flex-end;
    `;
  },

  content(t: Theme) {
    return css`
      display: flex;
      flex-direction: column;
      flex-shrink: 1;
      overflow: auto;
      background-color: ${t.bgDefault};
    `;
  },

  rootFullHeight(t: Theme) {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: ${t.bgDefault};
      justify-content: flex-start;
      flex-grow: 1;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
