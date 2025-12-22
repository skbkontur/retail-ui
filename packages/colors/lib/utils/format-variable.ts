export const camelCaseToKebabCase = (str: string) => {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

export const kebabCaseToCamelCase = (str: string) => {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
};
