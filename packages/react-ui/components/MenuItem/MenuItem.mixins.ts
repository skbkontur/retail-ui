import type { Emotion } from '@emotion/css/create-instance';

import { getMenuItemPaddings } from './MenuItem.styles';

export const menuItemSizeMixin =
  (emotion: Emotion) =>
  (
    menuItemLegacyPaddingX: string,
    menuItemPaddingX: string,
    menuItemLegacyPaddingY: string,
    menuItemPaddingY: string,
    menuItemLineHeight: string,
    menuItemFontSize: string,
  ) => {
    const { paddingX, paddingY } = getMenuItemPaddings({
      menuItemLegacyPaddingX,
      menuItemPaddingX,
      menuItemLegacyPaddingY,
      menuItemPaddingY,
    });

    return emotion.css`
      line-height: ${menuItemLineHeight};
      font-size: ${menuItemFontSize};
      padding: ${menuItemPaddingY} ${paddingX} ${paddingY} ${menuItemPaddingX};
    `;
  };

export const iconSizeMixin =
  (emotion: Emotion) => (menuItemIconWidth: string, menuItemPaddingX: string, menuItemIconLegacyMargin: string) => {
    return emotion.css`
      width: ${menuItemIconWidth};
      left: ${parseInt(menuItemPaddingX) + parseInt(menuItemIconLegacyMargin)}px;
    `;
  };

export const withIconSizeMixin = (emotion: Emotion) => (menuItemPaddingForIcon: string) => {
  return emotion.css`
    padding-left: ${menuItemPaddingForIcon};
  `;
};
