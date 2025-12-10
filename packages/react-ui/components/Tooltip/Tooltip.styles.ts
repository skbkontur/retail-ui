import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  closeButton(t: Theme) {
    return css`
      position: absolute;
      box-sizing: content-box;
      right: 0;
      top: 0;
      width: ${t.tooltipCloseBtnSide};
      height: ${t.tooltipCloseBtnSide};
      color: ${t.tooltipCloseBtnColor};
      cursor: pointer;
      line-height: 0;

      &:hover {
        color: ${t.tooltipCloseBtnHoverColor};
      }
    `;
  },

  closeButtonSmall(t: Theme) {
    return css`
      padding: ${t.tooltipCloseBtnPaddingSmall};
    `;
  },

  closeButtonMedium(t: Theme) {
    return css`
      padding: ${t.tooltipCloseBtnPaddingMedium};
    `;
  },

  closeButtonLarge(t: Theme) {
    return css`
      padding: ${t.tooltipCloseBtnPaddingLarge};
    `;
  },

  tooltipContent(t: Theme) {
    return css`
      position: relative;
      color: ${t.tooltipTextColor};
    `;
  },

  tooltipContentSmall(t: Theme) {
    return css`
      padding: ${t.tooltipPaddingYSmall} ${t.tooltipPaddingXSmall};
      font-size: ${t.tooltipFontSizeSmall};
      line-height: ${t.tooltipLineHeightSmall};
    `;
  },

  tooltipContentMedium(t: Theme) {
    return css`
      padding: ${t.tooltipPaddingYMedium} ${t.tooltipPaddingXMedium};
      font-size: ${t.tooltipFontSizeMedium};
      line-height: ${t.tooltipLineHeightMedium};
    `;
  },

  tooltipContentLarge(t: Theme) {
    return css`
      padding: ${t.tooltipPaddingYLarge} ${t.tooltipPaddingXLarge};
      font-size: ${t.tooltipFontSizeLarge};
      line-height: ${t.tooltipLineHeightLarge};
    `;
  },
}));
