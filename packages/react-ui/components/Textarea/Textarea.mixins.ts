export const rootTextareaSizeMixin = (fontSize: string, lineHeight: string): string => {
  return `
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const textareaSizeMixin = (paddingY: string, paddingX: string, minHeight: string): string => {
  return `
    min-height: ${minHeight};
    padding: ${paddingY} ${paddingX};
  `;
};
