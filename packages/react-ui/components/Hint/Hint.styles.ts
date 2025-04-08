import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../lib/theming/Theme';
import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    content(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        text-align: ${t.hintTextAlign};
      `;
    },
  });
