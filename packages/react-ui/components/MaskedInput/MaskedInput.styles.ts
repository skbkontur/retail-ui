import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles, prefix } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';
import { UI_FONT_NAME, injectGlobalFont } from '../../lib/styles/UiFont';

export const globalClasses = prefix('masked-input')({
  root: 'root',
});

export const getStyles = memoizeGetStyles((emotion: Emotion) => {
  injectGlobalFont(emotion);
  return {
    root(t: Theme) {
      return emotion.css`
        font-family: ${UI_FONT_NAME}, ${t.baseFontFamily};
        font-variant-numeric: tabular-nums;
      `;
    },
  };
});
