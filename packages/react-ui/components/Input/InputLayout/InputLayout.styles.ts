import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';
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
    `;
  },
  aside() {
    return css`
      display: inline-flex;
      align-items: center;
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
  iconDisabled() {
    return css`
      cursor: default;
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
