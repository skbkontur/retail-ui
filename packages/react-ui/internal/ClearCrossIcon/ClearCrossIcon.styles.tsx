import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        ${resetButton(emotion)}
        color: ${t.clearCrossIconColor};
        cursor: pointer;
        transition: color ${t.transitionDuration} ${t.transitionTimingFunction};
        &:hover {
          color: ${t.clearCrossIconHoverColor};
        }
        display: flex;
        justify-content: center;
        align-items: center;
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
        margin-right: ${t.clearCrossIconRightMarginSmall};
        border-radius: ${t.clearCrossIconBorderRadiusSmall};
      `;
    },
    clearCrossMedium(t: Theme) {
      return emotion.css`
        width: ${t.clearCrossIconWidthMedium};
        height: ${t.clearCrossIconHeightMedium};
        margin-right: ${t.clearCrossIconRightMarginMedium};
        border-radius: ${t.clearCrossIconBorderRadiusMedium};
      `;
    },
    clearCrossLarge(t: Theme) {
      return emotion.css`
        width: ${t.clearCrossIconWidthLarge};
        height: ${t.clearCrossIconHeightLarge};
        margin-right: ${t.clearCrossIconRightMarginLarge};
        border-radius: ${t.clearCrossIconBorderRadiusLarge};
      `;
    },
  });
