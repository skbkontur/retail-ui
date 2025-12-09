export const menuHeaderSizeMixin = (
  menuHeaderPaddingX: string,
  menuHeaderFontSize: string,
  menuHeaderLineHeight: string,
  menuHeaderPaddingTop: string,
  menuHeaderPaddingBottom: string,
) => {
  const paddingRight = menuHeaderPaddingX;

  return `
    font-size: ${menuHeaderFontSize};
    line-height: ${menuHeaderLineHeight};
    padding: ${menuHeaderPaddingTop} ${paddingRight} ${menuHeaderPaddingBottom} ${menuHeaderPaddingX};
  `;
};

export const withIconSizeMixin = (menuItemPaddingForIcon: string) => {
  return `
    padding-left: ${menuItemPaddingForIcon};
  `;
};
