import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../../lib/theming/Emotion.js';
import type { Theme } from '../../../lib/theming/Theme.js';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => {
  const rootBase6_1 = (t: Theme) => css`
    position: relative;
    background: ${t.menuBgDefault};
    border-top-left-radius: ${t.mobilePopupContainerBorderRadius};
    border-top-right-radius: ${t.mobilePopupContainerBorderRadius};
  `;

  const containerBase6_1 = () => css`
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

    rootSmall6_1(t: Theme) {
      return css`
        ${rootBase6_1(t)};
        padding-top: ${t.mobilePopupPaddingSmall};
      `;
    },

    rootMedium6_1(t: Theme) {
      return css`
        ${rootBase6_1(t)};
        padding-top: ${t.mobilePopupPaddingMedium};
      `;
    },

    rootLarge6_1(t: Theme) {
      return css`
        ${rootBase6_1(t)};
        padding-top: ${t.mobilePopupPaddingLarge};
      `;
    },

    containerSmall6_1(t: Theme) {
      return css`
        ${containerBase6_1()};
        padding: ${t.mobilePopupHeaderPaddingSmall};
      `;
    },

    containerMedium6_1(t: Theme) {
      return css`
        ${containerBase6_1()};
        padding: ${t.mobilePopupHeaderPaddingMedium};
      `;
    },

    containerLarge6_1(t: Theme) {
      return css`
        ${containerBase6_1()};
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
