import type { Emotion } from '@emotion/css/create-instance';

import type { Theme } from '../../lib/theming/Theme.js';
import { memoizeGetStyles } from '../../lib/theming/Emotion.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  content(t: Theme) {
    return css`
      box-sizing: border-box;
      color: ${t.hintColor};
      font-size: ${t.hintFontSize};
      line-height: ${t.hintLineHeight};
      max-width: ${t.hintMaxWidth};
      overflow-wrap: break-word;
      padding: ${t.hintPaddingY} ${t.hintPaddingX};
      word-break: break-word;
      word-wrap: break-word;
    `;
  },

  contentCenter(t: Theme) {
    return css`
      text-align: ${t.hintTextAlign};
    `;
  },
}));
