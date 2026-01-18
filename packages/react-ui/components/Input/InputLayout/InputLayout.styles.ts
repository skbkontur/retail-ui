import type { Emotion } from '@emotion/css/create-instance';

import { ZERO_WIDTH_SPACE_CSS } from '../../../lib/chars.js';
import { memoizeGetStyles } from '../../../lib/theming/Emotion.js';
import type { Theme } from '../../../lib/theming/Theme.js';
import { getStyles } from '../Input.styles.js';

export const getStylesLayout = memoizeGetStyles((emotion: Emotion) => {
  const styles = getStyles(emotion);

  return {
    root(t: Theme) {
      return styles.root(t);
    },
    input() {
      return emotion.css`
        min-width: 0;
        overflow: hidden;
        position: relative;
        width: 100%;
        display: flex;
      `;
    },
    aside() {
      return emotion.css`
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;

        &::before {
          content: '${ZERO_WIDTH_SPACE_CSS}';
        }
      `;
    },
    icon(t: Theme) {
      return emotion.css`
        color: ${t.inputIconColor};
      `;
    },
    iconFocus(t: Theme) {
      return emotion.css`
        color: ${t.inputFocusedIconColor};
      `;
    },
    iconDisabled(t: Theme) {
      return emotion.css`
        cursor: default;
        color: ${t.inputIconColorDisabled};
      `;
    },
    text(t: Theme) {
      return emotion.css`
        color: ${t.inputPlaceholderColor};
      `;
    },
    textDisabled(t: Theme) {
      return emotion.css`
        color: ${t.inputPlaceholderColorDisabled};
      `;
    },
  };
});
