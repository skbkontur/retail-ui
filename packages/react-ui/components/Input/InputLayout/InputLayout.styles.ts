import type { Emotion } from '@emotion/css/create-instance';

import { ZERO_WIDTH_SPACE_CSS } from '../../../lib/chars';
import { memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';
import { getStyles } from '../Input.styles';

export const getStylesLayout = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return getStyles(emotion).root(t);
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
  });
