export const tokenSizeMixin = (
  tokenPaddingY: string,
  tokenPaddingX: string,
  lineHeight: string,
  fontSize: string,
  tokenMarginY: string,
  tokenMarginX: string,
) => {
  return `
    padding: ${tokenPaddingY} ${tokenPaddingX};
    margin: ${tokenMarginY} ${tokenMarginX};
    line-height: ${lineHeight};
    font-size: ${fontSize};
  `;
};
