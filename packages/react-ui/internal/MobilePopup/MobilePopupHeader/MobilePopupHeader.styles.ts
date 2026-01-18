import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../../lib/theming/Emotion.js';
import type { Theme } from '../../../lib/theming/Theme.js';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root(t: Theme) {
    return css`
      position: relative;
      padding: ${t.mobilePopupHeaderPadding};
    `;
  },

  rootWithoutContent() {
    return css`
      padding: 8px 0 0 0;
    `;
  },

  container() {
    return css`
      display: flex;
      flex-direction: column;
    `;
  },

  caption(t: Theme) {
    return css`
      font-size: ${t.mobilePopupHeaderFontSize};
      line-height: ${t.mobilePopupHeaderLineHeight};
      font-weight: ${t.mobilePopupHeaderFontWeight};
      color: ${t.textColorDefault};
    `;
  },

  captionWithChildren() {
    return css`
      padding-bottom: 8px;
    `;
  },
}));
