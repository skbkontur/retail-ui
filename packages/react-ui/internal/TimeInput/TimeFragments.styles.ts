import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root() {
    return css`
      cursor: text;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    `;
  },

  selected(t: Theme) {
    const getSelection = (background: string, color: string) =>
      (background || color) &&
      `& ::selection {
        background: ${background};
        color: ${color};
      }`;

    return css`
      cursor: text;
      ${getSelection(t.timePickerSelectedBgColor, t.timePickerSelectedTextColor)}
    `;
  },

  mask(t: Theme) {
    return css`
      color: ${t.timePickerMaskColor};
    `;
  },

  segment() {
    return css`
      display: inline;
      font-variant-numeric: tabular-nums;
      white-space: pre;
    `;
  },

  separator() {
    return css`
      display: inline;
      position: relative;
    `;
  },

  separatorSmall(t: Theme) {
    return css`
      top: ${t.timePickerSeparatorOffsetTopSmall};
      padding-left: ${t.timePickerSeparatorPaddingXSmall};
      padding-right: ${t.timePickerSeparatorPaddingXSmall};
    `;
  },

  separatorMedium(t: Theme) {
    return css`
      top: ${t.timePickerSeparatorOffsetTopMedium};
      padding-left: ${t.timePickerSeparatorPaddingXMedium};
      padding-right: ${t.timePickerSeparatorPaddingXMedium};
    `;
  },

  separatorLarge(t: Theme) {
    return css`
      top: ${t.timePickerSeparatorOffsetTopLarge};
      padding-left: ${t.timePickerSeparatorPaddingXLarge};
      padding-right: ${t.timePickerSeparatorPaddingXLarge};
    `;
  },

  separatorFilled() {
    return css`
      color: inherit;
    `;
  },
}));
