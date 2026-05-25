import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../../lib/theming/Emotion.js';
import type { Theme } from '../../../lib/theming/Theme.js';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => {
  const rootBase_6_1 = (t: Theme) => css`
    position: relative;
    background: ${t.menuBgDefault};
    border-top-left-radius: ${t.mobilePopupContainerBorderRadius};
    border-top-right-radius: ${t.mobilePopupContainerBorderRadius};
  `;

  const containerBase_6_1 = () => css`
    display: flex;
    flex-direction: column;
  `;

  return {
    root(t: Theme) {
      return css`
        position: relative;
        padding: ${t.mobilePopupHeaderPadding};
      `;
    },

    rootWithoutContent() {
      return css`
        padding: 8px 0 0 0;
      `;
    },

    container() {
      return css`
        display: flex;
        flex-direction: column;
      `;
    },

    rootSmall_6_1(t: Theme) {
      return css`
        ${rootBase_6_1(t)};
        padding-top: ${t.mobilePopupPaddingSmall};
      `;
    },

    rootMedium_6_1(t: Theme) {
      return css`
        ${rootBase_6_1(t)};
        padding-top: ${t.mobilePopupPaddingMedium};
      `;
    },

    rootLarge_6_1(t: Theme) {
      return css`
        ${rootBase_6_1(t)};
        padding-top: ${t.mobilePopupPaddingLarge};
      `;
    },

    containerSmall_6_1(t: Theme) {
      return css`
        ${containerBase_6_1()};
        padding: ${t.mobilePopupHeaderPaddingSmall};
      `;
    },

    containerMedium_6_1(t: Theme) {
      return css`
        ${containerBase_6_1()};
        padding: ${t.mobilePopupHeaderPaddingMedium};
      `;
    },

    containerLarge_6_1(t: Theme) {
      return css`
        ${containerBase_6_1()};
        padding: ${t.mobilePopupHeaderPaddingLarge};
      `;
    },

    caption(t: Theme) {
      return css`
        font-size: ${t.mobilePopupHeaderFontSize};
        line-height: ${t.mobilePopupHeaderLineHeight};
        font-weight: ${t.mobilePopupHeaderFontWeight};
        color: ${t.textColorDefault};
      `;
    },

    captionWithChildren() {
      return css`
        padding-bottom: 8px;
      `;
    },
  };
});
