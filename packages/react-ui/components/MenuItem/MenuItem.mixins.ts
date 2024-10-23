import type { Emotion } from '@emotion/css/create-instance';

import { getMenuItemPaddings } from './MenuItem.styles';

export const menuItemSizeMixin =
  (emotion: Emotion) =>
  (menuItemPaddingX: string, menuItemPaddingY: string, menuItemLineHeight: string, menuItemFontSize: string) => {
    const { paddingX, paddingY } = getMenuItemPaddings({
      menuItemPaddingX,
      menuItemPaddingY,
    });

    return emotion.css`
      line-height: ${menuItemLineHeight};
      font-size: ${menuItemFontSize};
      padding: ${menuItemPaddingY} ${paddingX} ${paddingY} ${menuItemPaddingX};
    `;
  };

export const iconSizeMixin = (emotion: Emotion) => (menuItemIconWidth: string, menuItemPaddingX: string) => {
  return emotion.css`
      width: ${menuItemIconWidth};
      left: ${parseInt(menuItemPaddingX)}px;
    `;
};

export const withIconSizeMixin = (emotion: Emotion) => (menuItemPaddingForIcon: string) => {
  return emotion.css`
    padding-left: ${menuItemPaddingForIcon};
  `;
};
