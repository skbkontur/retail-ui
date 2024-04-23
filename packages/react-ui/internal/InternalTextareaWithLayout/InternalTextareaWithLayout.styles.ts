import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  contentWrapper() {
    return css`
      display: inline-flex;
      align-items: flex-start;
    `;
  },
});
