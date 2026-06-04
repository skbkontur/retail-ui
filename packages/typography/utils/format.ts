export const toCamelCaseWithCapsSize = (str: string) => {
  const parts = str.split('-');
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part;
      }
      if (index === parts.length - 1) {
        return part.toUpperCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
};
