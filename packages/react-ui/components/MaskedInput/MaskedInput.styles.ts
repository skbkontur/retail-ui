import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { UI_FONT_NAME } from '../../lib/styles/UiFont';

export const globalClasses = prefix('masked-input')({
  root: 'root',
});

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      font-family: ${UI_FONT_NAME}, ${t.baseFontFamily};
      font-variant-numeric: tabular-nums;
    `;
  },
});
