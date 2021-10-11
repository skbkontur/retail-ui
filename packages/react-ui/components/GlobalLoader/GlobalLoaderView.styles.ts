import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  outer(t: Theme) {
    return css`
      width: ${t.globalLoaderWidth};
      height: ${t.globalLoaderHeight};
      background-color: ${t.globalLoaderBackgroundColor};
      position: ${t.globalLoaderPosition};
      left: ${t.globalLoaderLeft};
      top: ${t.globalLoaderTop};
      right: ${t.globalLoaderRight};
      bottom: ${t.globalLoaderBottom};
      overflow: hidden;
    `;
  },
  inner(t: Theme) {
    return css`
      background-color: ${t.globalLoaderColor};
      width: 0;
      height: ${t.globalLoaderHeight};
      position: absolute;
      left: 0;
      overflow: hidden;
      -webkit-transition: all 1s ease-in-out;
      -moz-transition: all 1s ease-in-out;
      -o-transition: all 1s ease-in-out;
      transition: all 1s ease-in-out;
    `;
  },
  fullWidth() {
    return css`
      width: 100%;
    `;
  },
});
