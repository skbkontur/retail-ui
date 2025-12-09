export const menuFooterSizeMixin = (
  menuFooterPaddingX: string,
  menuFooterFontSize: string,
  menuFooterLineHeight: string,
  menuFooterPaddingTop: string,
  menuFooterPaddingBottom: string,
) => {
  const paddingRight = menuFooterPaddingX;

  return `
    font-size: ${menuFooterFontSize};
    line-height: ${menuFooterLineHeight};
    padding: ${menuFooterPaddingTop} ${paddingRight} ${menuFooterPaddingBottom} ${menuFooterPaddingX};
  `;
};

export const withIconSizeMixin = (menuItemPaddingForIcon: string) => {
  return `
    padding-left: ${menuItemPaddingForIcon};
  `;
};
