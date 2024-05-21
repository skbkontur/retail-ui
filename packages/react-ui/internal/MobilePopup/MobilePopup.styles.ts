import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
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
      return emotion.css`
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      overflow: auto;
    `;
    },

    content(t: Theme) {
      return emotion.css`
      background-color: ${t.bgDefault};
    `;
    },

    container(t: Theme) {
      return emotion.css`
      position: absolute;
      top: ${t.mobilePopupTopPadding};
      left: ${t.mobilePopupOuterIndentY};
      right: ${t.mobilePopupOuterIndentY};
      z-index: 100000;
    `;
    },

    bg() {
      return emotion.css`
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
      background: #333333;
      pointer-events: none;
      opacity: 50%;
    `;
    },

    bottomIndent() {
      return emotion.css`
      height: 80px;
    `;
    },

    zIndex() {
      return emotion.css`
      position: relative;
    `;
    },
  });
