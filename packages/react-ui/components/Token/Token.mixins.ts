export const tokenSizeMixin = (
  tokenPaddingY: string,
  tokenPaddingX: string,
  lineHeight: string,
  fontSize: string,
  tokenMarginY: string,
  tokenMarginX: string,
): string => {
  return `
    padding: ${tokenPaddingY} ${tokenPaddingX};
    margin: ${tokenMarginY} ${tokenMarginX};
    line-height: ${lineHeight};
    font-size: ${fontSize};
  `;
};
