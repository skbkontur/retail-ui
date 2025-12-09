export const rootTextareaSizeMixin = (fontSize: string, lineHeight: string) => {
  return `
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const textareaSizeMixin = (paddingY: string, paddingX: string, minHeight: string) => {
  return `
    min-height: ${minHeight};
    padding: ${paddingY} ${paddingX};
  `;
};

export const counterSizeMixin = (paddingX: string, paddingY: string) => {
  return `
    right: ${paddingY};
    bottom: ${paddingX};
  `;
};
