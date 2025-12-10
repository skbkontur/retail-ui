import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { resetButton } from '../../lib/styles/Mixins.js';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
      ${resetButton()}
      color: ${t.clearCrossIconColor};
      cursor: pointer;
      transition: color ${t.transitionDuration} ${t.transitionTimingFunction};
      &:hover {
        color: ${t.clearCrossIconHoverColor};
      }
      display: flex;
      justify-content: ${t.clearCrossIconAlign};
      align-items: center;
      position: absolute;
      right: -${t.inputBorderWidth};
      top: -${t.inputBorderWidth};
    `;
    },

    focus(t: Theme) {
      return emotion.css`
        color: ${t.clearCrossIconHoverColor};
      `;
    },

    clearCrossSmall(t: Theme) {
      return emotion.css`
      width: ${t.clearCrossIconWidthSmall};
      height: ${t.clearCrossIconHeightSmall};
      border-radius: ${t.clearCrossIconBorderRadiusSmall};
    `;
    },
    clearCrossMedium(t: Theme) {
      return emotion.css`
      width: ${t.clearCrossIconWidthMedium};
      height: ${t.clearCrossIconHeightMedium};
      border-radius: ${t.clearCrossIconBorderRadiusMedium};
    `;
    },
    clearCrossLarge(t: Theme) {
      return emotion.css`
      width: ${t.clearCrossIconWidthLarge};
      height: ${t.clearCrossIconHeightLarge};
      border-radius: ${t.clearCrossIconBorderRadiusLarge};
    `;
    },
    relativeWidthSmall(t: Theme) {
      return emotion.css`
      display: inline-block;
      width: ${t.inputIconSizeSmall};
    `;
    },
    relativeWidthMedium(t: Theme) {
      return emotion.css`
      display: inline-block;
      width: ${t.inputIconSizeMedium};
    `;
    },
    relativeWidthLarge(t: Theme) {
      return emotion.css`
      display: inline-block;
      width: ${t.inputIconSizeLarge};
    `;
    },
  });
