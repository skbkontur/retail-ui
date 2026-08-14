export const memo = <A extends Record<string, unknown>, R>(
  fn: (() => R) | ((arg: A) => R),
): (() => R) | ((arg: A) => R) => {
  const cache = new WeakMap();
  return (arg: A) => {
    if (!cache.has(arg)) {
      cache.set(arg, fn(arg));
    }

    return cache.get(arg);
  };
};
