import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => {
  const content6_1 = (t: Theme) => {
    return css`
      background-color: ${t.bgDefault};
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0;
      }
    `;
  };
  return {
    root(t: Theme) {
      return css`
        width: 100%;
        height: 100%;
        flex-direction: column;
        display: flex;
        justify-content: flex-end;
        border-radius: ${t.mobilePopupContainerBorderRadius};
        overflow: hidden;
        padding-bottom: ${t.mobilePopupContainerBottomPadding};
        background: ${t.menuBgDefault};
      `;
    },

    wrapper() {
      return css`
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        overflow: auto;
      `;
    },

    content(t: Theme) {
      return css`
        background-color: ${t.bgDefault};
      `;
    },

    container(t: Theme) {
      return css`
        position: absolute;
        top: ${t.mobilePopupTopPadding};
        left: ${t.mobilePopupOuterIndentY};
        right: ${t.mobilePopupOuterIndentY};
        z-index: 100000;
      `;
    },

    root6_1(t: Theme) {
      return css`
        width: 100%;
        height: 100%;
        flex-direction: column;
        display: flex;
        justify-content: flex-end;
        border-radius: ${t.mobilePopupContainerBorderRadius};
        overflow: hidden;
        background: ${t.menuBgDefault};

        max-height: calc(100vh - (2 * ${t.mobilePopupPositionY}));
        max-height: calc(100dvh - (2 * ${t.mobilePopupPositionY}));
      `;
    },

    wrapper6_1(t: Theme) {
      return css`
        position: fixed;
        top: ${t.mobilePopupPositionY};
        bottom: ${t.mobilePopupPositionY};
        right: ${t.mobilePopupPositionX};
        left: ${t.mobilePopupPositionX};
        display: flex;
        align-items: center;
      `;
    },

    contentSmall6_1(t: Theme) {
      return css`
        ${content6_1(t)}
        padding: ${t.mobilePopupPaddingSmall};
      `;
    },

    contentMedium6_1(t: Theme) {
      return css`
        ${content6_1(t)}
        padding: ${t.mobilePopupPaddingMedium};
      `;
    },

    contentLarge6_1(t: Theme) {
      return css`
        ${content6_1(t)}
        padding: ${t.mobilePopupPaddingLarge};
      `;
    },

    containerBase6_1(t: Theme) {
      return css`
        position: absolute;
        z-index: 100000;
        min-width: calc(100vw - (2 * ${t.mobilePopupPositionX}));
      `;
    },

    containerBottom6_1(t: Theme) {
      return css`
        bottom: 0;
        max-height: calc(100vh - (2 * ${t.mobilePopupPositionY}));
      `;
    },

    bg() {
      return css`
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 9999;
        touch-action: none;
        background: #333333;
        opacity: 50%;
      `;
    },

    bottomIndent() {
      return css`
        height: 80px;
      `;
    },

    zIndex() {
      return css`
        position: relative;
      `;
    },
  };
});
