import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        display: inline-block;
        position: relative;
        line-height: normal;
      `;
    },

    rootMobile(t: Theme) {
      return emotion.css`
        width: ${t.selectRootWidthMobile};
        max-width: ${t.mobileSelectMaxWidth};
      `;
    },

    placeholder(t: Theme) {
      return emotion.css`
        color: ${t.selectPlaceholderColor};
        text-overflow: ellipsis;
      `;
    },

    placeholderDisabled(t: Theme) {
      return emotion.css`
        color: ${t.selectPlaceholderColorDisabled};
      `;
    },

    customUsePlaceholder() {
      return emotion.css`
        color: inherit;
        opacity: 0.7;
      `;
    },

    arrowWrap(t: Theme) {
      return emotion.css`
        color: ${t.selectMenuArrowColor};
        flex-shrink: 0;
      `;
    },

    arrowDisabled(t: Theme) {
      return emotion.css`
        color: ${t.selectMenuArrowColorDisabled};
      `;
    },

    customUseArrow() {
      return emotion.css`
        color: inherit;
        opacity: 0.7;
      `;
    },

    label() {
      return emotion.css`
        flex: 1 1 auto;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      `;
    },

    search() {
      return emotion.css`
        margin: 1px 4px 4px;
      `;
    },

    leftIconSmall(t: Theme) {
      return emotion.css`
        margin-right: ${t.selectIconGapSmall};
        width: ${t.btnIconSizeSmall};
      `;
    },

    leftIconMedium(t: Theme) {
      return emotion.css`
        margin-right: ${t.selectIconGapMedium};
        width: ${t.btnIconSizeMedium};
      `;
    },

    leftIconLarge(t: Theme) {
      return emotion.css`
        margin-right: ${t.selectIconGapLarge};
        width: ${t.btnIconSizeLarge};
      `;
    },

    leftIconLink(t: Theme) {
      return emotion.css`
        margin-right: ${t.btnLinkIconMarginRight};
      `;
    },

    selectButtonContainer() {
      return emotion.css`
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
      `;
    },
  });
