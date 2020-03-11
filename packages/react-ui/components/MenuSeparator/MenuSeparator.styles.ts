import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      margin: 5px 0;
      border-top: 1px solid ${t.menuSeparatorBorderColor};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
