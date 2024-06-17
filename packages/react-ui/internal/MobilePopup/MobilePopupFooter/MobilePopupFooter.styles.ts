import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      padding: ${t.mobilePopupHeaderPadding};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
