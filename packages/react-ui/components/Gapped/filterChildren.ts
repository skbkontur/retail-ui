/**
 * Function for removing irrelevant children from children array.
 */
export const filterChildren = (children: React.ReactNode) => {
  return !!children || typeof children === 'number';
};
