import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    file() {
      return emotion.css`
      width: 100%;
    `;
    },
    fileWrapper() {
      return emotion.css`
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    `;
    },

    fileWrapperSmall(t: Theme) {
      return emotion.css`
      padding: ${t.fileUploaderPaddingYSmall} ${t.fileUploaderPaddingXSmall};
    `;
    },

    fileWrapperMedium(t: Theme) {
      return emotion.css`
      padding: ${t.fileUploaderPaddingYMedium} ${t.fileUploaderPaddingXMedium};
    `;
    },

    fileWrapperLarge(t: Theme) {
      return emotion.css`
      padding: ${t.fileUploaderPaddingYLarge} ${t.fileUploaderPaddingXLarge};
    `;
    },
  });
