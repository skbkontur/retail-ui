type MemoFunction<T> = (...args: T[]) => void;

export function memo<T extends string | number>(fn: MemoFunction<T>) {
  // The value can actually be `any`thing.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cache: Record<string, any> = {};
  const getHash = (args: T[]) => args.reduce((acc, x) => acc + x, '');
  let keysCount = 0;
  const limit = 1e4;

  return (...args: Parameters<MemoFunction<T>>) => {
    try {
      const hash = getHash(args);
      const fromCache = cache[hash];
      if (fromCache) {
        return fromCache;
      }
      const result = fn(...args);
      cache[hash] = result;
      keysCount++;
      return result;
    } finally {
      if (keysCount > limit) {
        cache = {};
        keysCount = 0;
      }
    }
  };
}
