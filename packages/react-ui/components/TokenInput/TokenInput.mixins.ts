export const labelSizeMixin = (tokenInputPaddingY: string, tokenInputPaddingX: string) => {
  return `
    padding: ${tokenInputPaddingY} ${tokenInputPaddingX};
  `;
};

export const inputSizeMixin = (fontSize: string, lineHeight: string) => {
  return `
    font-size: ${fontSize};
    height: ${lineHeight};
    line-height: ${lineHeight};
  `;
};
