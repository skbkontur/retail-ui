import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root() {
    return css`
      display: inline-block;
      position: relative;
      line-height: normal;
    `;
  },

  popup(t: Theme) {
    return css`
      background: ${t.timePickerPopupBg};
      border-radius: ${t.timePickerPopupBorderRadius};
      box-shadow: ${t.timePickerPopupShadow};
      font-variant-numeric: tabular-nums;
      overflow: hidden;
    `;
  },

  item() {
    return css`
      display: flex;
      align-items: center;
      width: 100%;
      font-variant-numeric: tabular-nums;
    `;
  },

  itemSmall(t: Theme) {
    return css`
      gap: ${t.timePickerItemGapSmall};
    `;
  },

  itemMedium(t: Theme) {
    return css`
      gap: ${t.timePickerItemGapMedium};
    `;
  },

  itemLarge(t: Theme) {
    return css`
      gap: ${t.timePickerItemGapLarge};
    `;
  },

  itemValue() {
    return css`
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    `;
  },

  itemLabel(t: Theme) {
    return css`
      color: ${t.menuItemCommentColor};
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    `;
  },
}));
