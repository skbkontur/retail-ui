import { ZERO_WIDTH_SPACE_CSS } from '../../../lib/chars';
import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import type { Theme } from '../../../lib/theming/Theme';
import { styles } from '../Input.styles';

export const stylesLayout = memoizeStyle({
  root(t: Theme) {
    return styles.root(t);
  },
  input() {
    return css`
      min-width: 0;
      overflow: hidden;
      position: relative;
      width: 100%;
      display: flex;
    `;
  },
  aside() {
    return css`
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;

      &::before {
        content: '${ZERO_WIDTH_SPACE_CSS}';
      }
    `;
  },
  icon(t: Theme) {
    return css`
      color: ${t.inputIconColor};
    `;
  },
  iconFocus(t: Theme) {
    return css`
      color: ${t.inputFocusedIconColor};
    `;
  },
  iconDisabled(t: Theme) {
    return css`
      cursor: default;
      color: ${t.inputIconColorDisabled};
    `;
  },
  text(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColor};
    `;
  },
  textDisabled(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColorDisabled};
    `;
  },
});
