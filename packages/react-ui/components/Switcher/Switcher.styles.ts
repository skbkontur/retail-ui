import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        line-height: normal;
      `;
    },

    wrap() {
      return emotion.css`
        display: inline-block;
        vertical-align: middle;
      `;
    },

    input() {
      return emotion.css`
        height: 0;
        opacity: 0;
        position: absolute;
        width: 0;
      `;
    },

    caption(t: Theme) {
      return emotion.css`
        color: ${t.switcherTextColor};
        vertical-align: middle;
        display: inline-block;
      `;
    },

    captionSmall(t: Theme) {
      return emotion.css`
        margin-right: ${t.switcherCaptionGapSmall};
        font-size: ${t.switcherCaptionFontSizeSmall};
        line-height: ${t.switcherCaptionLineHeightSmall};
      `;
    },

    captionMedium(t: Theme) {
      return emotion.css`
        margin-right: ${t.switcherCaptionGapMedium};
        font-size: ${t.switcherCaptionFontSizeMedium};
        line-height: ${t.switcherCaptionLineHeightMedium};
      `;
    },

    captionLarge(t: Theme) {
      return emotion.css`
        margin-right: ${t.switcherCaptionGapLarge};
        font-size: ${t.switcherCaptionFontSizeLarge};
        line-height: ${t.switcherCaptionLineHeightLarge};
      `;
    },

    error(t: Theme) {
      const insideWidth = parseInt(t.btnBorderWidth);
      const outsideWidth = `${parseInt(t.switcherOutlineWidth) - insideWidth}px`;
      return emotion.css`
        border-radius: ${t.switcherBorderRadius};
        box-shadow:
        inset 0 0 0 ${insideWidth}px ${t.borderColorError},
        0 0 0 ${outsideWidth} ${t.borderColorError};
      `;
    },

  error5_1(t: Theme) {
    return css`
      position: relative;

      &:before {
        content: '';
        position: absolute;
        pointer-events: none;
        top: 1px;
        right: 1px;
        bottom: 1px;
        left: 1px;
        z-index: 1;
        border-radius: ${t.switcherBorderRadius};
        box-shadow: 0 0 0 ${t.switcherOutlineWidth} ${t.borderColorError};
      }
    `;
  },
  });
