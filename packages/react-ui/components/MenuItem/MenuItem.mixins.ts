import { css } from '../../lib/theming/Emotion';

import { getMenuItemPaddings } from './MenuItem.styles';

export const menuItemSizeMixin = (
  menuItemPaddingX: string,
  menuItemPaddingY: string,
  menuItemLineHeight: string,
  menuItemFontSize: string,
) => {
  const { paddingX, paddingY } = getMenuItemPaddings({
    menuItemPaddingX,
    menuItemPaddingY,
  });

  return css`
    line-height: ${menuItemLineHeight};
    font-size: ${menuItemFontSize};
    padding: ${menuItemPaddingY} ${paddingX} ${paddingY} ${menuItemPaddingX};
  `;
};

export const iconSizeMixin = (menuItemIconWidth: string, menuItemPaddingX: string) => {
  return css`
    width: ${menuItemIconWidth};
    left: ${parseInt(menuItemPaddingX)}px;
  `;
};

export const withIconSizeMixin = (menuItemPaddingForIcon: string) => {
  return css`
    padding-left: ${menuItemPaddingForIcon};
  `;
};
