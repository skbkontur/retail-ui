import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
      position: relative;
      padding: ${t.mobilePopupHeaderPadding};
    `;
    },

    rootWithoutContent() {
      return emotion.css`
      padding: 8px 0 0 0;
    `;
    },

    container() {
      return emotion.css`
      display: flex;
      flex-direction: column;
    `;
    },

    caption(t: Theme) {
      return emotion.css`
      font-size: ${t.mobilePopupHeaderFontSize};
      line-height: ${t.mobilePopupHeaderLineHeight};
      font-weight: ${t.mobilePopupHeaderFontWeight};
      color: ${t.textColorDefault};
    `;
    },

    captionWithChildren() {
      return emotion.css`
      padding-bottom: 8px;
    `;
    },
  });
