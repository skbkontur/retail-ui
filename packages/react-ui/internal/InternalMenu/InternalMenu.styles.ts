import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        padding: ${t.internalMenuPaddingY} ${t.menuPaddingX};
        outline: none;
        box-sizing: content-box;
        background: ${t.bgSecondary};
      `;
    },

    mobileRoot(t: Theme) {
      return emotion.css`
        padding: 0 ${t.mobileMenuPaddingX};
      `;
    },

    shadow(t: Theme) {
      return emotion.css`
        border: ${t.menuBorder};
        box-shadow: ${t.menuShadow};
      `;
    },

    wrapper() {
      return emotion.css`
        position: relative;
        z-index: 1;
        width: 100%;
        overflow: hidden;
        line-height: 18px;
        box-sizing: border-box;
      `;
    },

    headerWrapper() {
      return emotion.css`
        top: -5px;
      `;
    },

    footerWrapper() {
      return emotion.css`
        bottom: -5px;
      `;
    },

    contentWrapper() {
      return emotion.css`
        padding: 6px 18px 7px 8px;
      `;
    },

    menuSeparatorWrapper(t: Theme) {
      return emotion.css`
        height: ${t.menuSeparatorBorderWidth};
      `;
    },
  });
