export const fileUploaderSizeMixin = (
  fontSize: string,
  lineHeight: string,
  paddingX: string,
  paddingY: string,
): string => {
  return `
    font-size: ${fontSize};
    box-sizing: border-box;
    padding: ${paddingY} ${paddingX};
    line-height: ${lineHeight};
  `;
};
