export const getDefaultProps = <T>(props: T) => {
  return props as Pick<T, keyof typeof props>;
};
