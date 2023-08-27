import { css } from '../../lib/theming/Emotion';

import { getMenuItemPaddings } from './MenuItem.styles';

export const menuItemSizeMixin = (
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

  return css`
    line-height: ${menuItemLineHeight};
    font-size: ${menuItemFontSize};
    padding: ${menuItemPaddingY} ${paddingX} ${paddingY} ${menuItemPaddingX};
  `;
};

export const iconSizeMixin = (
  menuItemIconWidth: string,
  menuItemPaddingX: string,
  menuItemIconLegacyMargin: string,
) => {
  return css`
    width: ${menuItemIconWidth};
    left: ${parseInt(menuItemPaddingX) + parseInt(menuItemIconLegacyMargin)}px;
  `;
};

export const withIconSizeMixin = (menuItemPaddingForIcon: string) => {
  return css`
    padding-left: ${menuItemPaddingForIcon};
  `;
};
