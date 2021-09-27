import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  outer(t: Theme) {
    return css`
      width: ${t.globalLoaderWidth};
      height: ${t.globalLoaderHeight};
      background-color: #666666;
    `;
  },
  inner(t: Theme) {
    return css`
      background-color: ${t.globalLoaderBackgroundColor};
      width: 0;
      height: ${t.globalLoaderHeight};
    `;
  },
});
