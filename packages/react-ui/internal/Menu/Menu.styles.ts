import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root(t: Theme) {
    return css`
      background: ${t.menuBgDefault};
      border-radius: ${t.menuBorderRadius};
      box-sizing: ${t.menuBoxSizing};
      outline: none;
      padding: ${t.menuPaddingY} ${t.menuPaddingX};
    `;
  },

  hasMargin(t: Theme) {
    return css`
      margin: ${t.menuOffsetY} 0;
    `;
  },

  mobileRoot(t: Theme) {
    return css`
      border-radius: 0;
      margin: 0;
      padding: 0 ${t.mobileMenuPaddingX};
    `;
  },

  alignRight() {
    return css`
      flex: 1 1 100%;
    `;
  },

  scrollContainer(t: Theme) {
    return css`
      padding: ${t.menuScrollContainerContentWrapperPaddingY} 0;
    `;
  },

  scrollContainerMobile(t: Theme) {
    return css`
      padding: ${t.mobileMenuScrollContainerContentWrapperPaddingY} 0;
    `;
  },

  shadow(t: Theme) {
    return css`
      border: ${t.menuBorder};
      box-shadow: ${t.menuShadow};
    `;
  },

  wrapper() {
    return css`
      position: relative;
      z-index: 1;
      width: 100%;
      overflow: hidden;
      line-height: 18px;
      box-sizing: border-box;
    `;
  },

  headerWrapper() {
    return css`
      top: -5px;
    `;
  },

  footerWrapper() {
    return css`
      bottom: -5px;
    `;
  },

  contentWrapper() {
    return css`
      padding: 6px 18px 7px 8px;
    `;
  },

  menuSeparatorWrapper(t: Theme) {
    return css`
      height: ${t.menuSeparatorBorderWidth};
    `;
  },
}));
