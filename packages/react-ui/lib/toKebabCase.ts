export const toKebabCase = (value: string) => {
  if (!value) {
    return '';
  }

  return value
    .split(/\.?(?=[A-Z])/)
    .join('-')
    .toLowerCase();
};
