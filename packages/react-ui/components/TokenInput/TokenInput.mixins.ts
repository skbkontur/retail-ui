export const labelSizeMixin = (tokenInputPaddingY: string, tokenInputPaddingX: string): string => {
  return `
    padding: ${tokenInputPaddingY} ${tokenInputPaddingX};
  `;
};

export const inputSizeMixin = (fontSize: string, lineHeight: string): string => {
  return `
    font-size: ${fontSize};
    height: ${lineHeight};
    line-height: ${lineHeight};
  `;
};
