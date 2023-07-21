import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      display: inline-block;
      width: ${t.inputWidth};
      transition: border-color 100ms cubic-bezier(0.5, 1, 0.89, 1);
    `;
  },
});
