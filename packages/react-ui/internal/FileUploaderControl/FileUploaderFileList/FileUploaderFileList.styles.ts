import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../../lib/theming/Emotion';
import type { Theme } from '../../../lib/theming/Theme';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => ({
  file() {
    return css`
      width: 100%;
    `;
  },
  fileWrapper() {
    return css`
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    `;
  },

  fileWrapperSmall(t: Theme) {
    return css`
      padding: ${t.fileUploaderPaddingYSmall} ${t.fileUploaderPaddingXSmall};
    `;
  },

  fileWrapperMedium(t: Theme) {
    return css`
      padding: ${t.fileUploaderPaddingYMedium} ${t.fileUploaderPaddingXMedium};
    `;
  },

  fileWrapperLarge(t: Theme) {
    return css`
      padding: ${t.fileUploaderPaddingYLarge} ${t.fileUploaderPaddingXLarge};
    `;
  },
}));
