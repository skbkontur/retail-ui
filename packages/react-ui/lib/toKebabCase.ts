export const toKebabCase = (value: string): string => {
  if (!value) {
    return '';
  }

  return value
    .split(/\.?(?=[A-Z])/)
    .join('-')
    .toLowerCase();
};
