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

  itemValue() {
    return css`
      white-space: nowrap;
    `;
  },

  itemLabel() {
    return css`
      white-space: nowrap;
    `;
  },

  itemLabelSmall(t: Theme) {
    return css`
      margin-left: ${t.timePickerItemGapSmall};
    `;
  },

  itemLabelMedium(t: Theme) {
    return css`
      margin-left: ${t.timePickerItemGapMedium};
    `;
  },

  itemLabelLarge(t: Theme) {
    return css`
      margin-left: ${t.timePickerItemGapLarge};
    `;
  },

  itemLabelColor(t: Theme) {
    return css`
      color: ${t.menuItemCommentColor};
    `;
  },
}));
