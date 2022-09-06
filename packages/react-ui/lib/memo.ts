type MemoFunction<T> = (...args: T[]) => any;

export function memo<T>(fn: MemoFunction<T>) {
  let cache: { [key: string]: any } = {};
  const getHash = (args: any[]) => args.reduce((acc, x) => acc + x, '');
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
