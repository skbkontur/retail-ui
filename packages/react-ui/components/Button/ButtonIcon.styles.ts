import type { Emotion } from '@emotion/css/create-instance';

import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    icon() {
      const space = `'${ZERO_WIDTH_SPACE_CSS}'`;
      return emotion.css`
      display: inline-block;

      &::before {
        content: ${space};
      }
    `;
    },

    iconSmall(t: Theme) {
      return emotion.css`
      width: ${t.btnIconSizeSmall};
    `;
    },

    iconSmallLeft(t: Theme) {
      return emotion.css`
      margin-right: ${t.btnIconGapSmallLeft};
    `;
    },

    iconSmallRight(t: Theme) {
      return emotion.css`
      margin-left: ${t.btnIconGapSmallRight};
    `;
    },

    iconMedium(t: Theme) {
      return emotion.css`
      width: ${t.btnIconSizeMedium};
    `;
    },

    iconMediumLeft(t: Theme) {
      return emotion.css`
      margin-right: ${t.btnIconGapMediumRight};
    `;
    },

    iconMediumRight(t: Theme) {
      return emotion.css`
      margin-left: ${t.btnIconGapMediumRight};
    `;
    },

    iconLarge(t: Theme) {
      return emotion.css`
      width: ${t.btnIconSizeLarge};
    `;
    },

    iconLargeLeft(t: Theme) {
      return emotion.css`
      margin-right: ${t.btnIconGapLargeLeft};
    `;
    },

    iconLargeRight(t: Theme) {
      return emotion.css`
      margin-left: ${t.btnIconGapLargeRight};
    `;
    },

    iconLeftLink(t: Theme) {
      return emotion.css`
      margin-right: ${t.btnLinkIconMarginRight};
    `;
    },

    iconRightLink(t: Theme) {
      return emotion.css`
      margin-left: ${t.btnLinkIconMarginLeft};
    `;
    },

    iconNoMargin() {
      return emotion.css`
      margin-right: 0;
      margin-left: 0;
    `;
    },
  });
