import { ZERO_WIDTH_SPACE_CSS } from '../../../lib/chars';
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
      display: flex;
    `;
  },
  aside() {
    // Такая запись используется намеренно смотри
    // https://github.com/skbkontur/retail-ui/pull/3316
    return css({
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0,

      '::before': {
        content: `'${ZERO_WIDTH_SPACE_CSS}'`,
      },
    });
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
