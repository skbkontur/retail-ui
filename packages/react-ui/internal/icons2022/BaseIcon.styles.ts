import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  centeredIcon() {
    return css`
      display: inline-flex;
      align-items: center;

      &::before {
        content: '${ZERO_WIDTH_SPACE_CSS}';
      }
    `;
  },
});
