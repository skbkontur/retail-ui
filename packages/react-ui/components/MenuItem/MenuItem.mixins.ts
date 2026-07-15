export const getMenuItemPaddings = ({
  menuItemPaddingX,
  menuItemPaddingY,
}: Record<'menuItemPaddingX' | 'menuItemPaddingY', string>): Record<'paddingX' | 'paddingY', string> => {
  const paddingX = menuItemPaddingX;
  const paddingY = menuItemPaddingY;

  return { paddingX, paddingY };
};

export const menuItemSizeMixin = (
  menuItemPaddingX: string,
  menuItemPaddingY: string,
  menuItemLineHeight: string,
  menuItemFontSize: string,
): string => {
  const { paddingX, paddingY } = getMenuItemPaddings({
    menuItemPaddingX,
    menuItemPaddingY,
  });

  return `
    line-height: ${menuItemLineHeight};
    font-size: ${menuItemFontSize};
    padding: ${menuItemPaddingY} ${paddingX} ${paddingY} ${menuItemPaddingX};
  `;
};

export const iconSizeMixin = (menuItemIconWidth: string, menuItemPaddingX: string): string => {
  return `
    width: ${menuItemIconWidth};
    left: ${parseInt(menuItemPaddingX)}px;
  `;
};

export const withIconSizeMixin = (menuItemPaddingForIcon: string): string => {
  return `
    padding-left: ${menuItemPaddingForIcon};
  `;
};
