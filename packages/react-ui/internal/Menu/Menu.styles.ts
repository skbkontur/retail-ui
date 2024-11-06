import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        background: ${t.menuBgDefault};
        border-radius: ${t.menuBorderRadius};
        box-sizing: ${t.menuBoxSizing};
        outline: none;
        padding: ${t.menuPaddingY} ${t.menuPaddingX};
    `;
    },

    hasMargin(t: Theme) {
      return emotion.css`
        margin: ${t.menuOffsetY} 0;
      `;
    },

    mobileRoot(t: Theme) {
      return emotion.css`
        border-radius: 0;
        margin: 0;
        padding: 0 ${t.mobileMenuPaddingX};
      `;
    },

    alignRight() {
      return emotion.css`
        flex: 1 1 100%;
      `;
    },

    alignRightIE11() {
      return emotion.css`
        float: right;
        width: 100%;
      `;
    },

    alignRightIE11FixAutoWidth() {
      return emotion.css`
        box-sizing: border-box !important; // override root styles
        overflow: hidden !important; // override root styles
      `;
    },

    scrollContainer(t: Theme) {
      return emotion.css`
        padding: ${t.menuScrollContainerContentWrapperPaddingY} 0;
      `;
    },

    scrollContainerMobile(t: Theme) {
      return emotion.css`
        padding: ${t.mobileMenuScrollContainerContentWrapperPaddingY} 0;
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
