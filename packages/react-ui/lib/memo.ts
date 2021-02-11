export function memo<T>(fn: T): T {
  let cache: { [key: string]: any } = {};
  const getHash = (args: any[]) => args.reduce((acc, x) => acc + x, '');
  let keysCount = 0;
  const limit = 1e4;

  // @ts-ignore
  return (...args) => {
    try {
      const hash = getHash(args);
      const fromCache = cache[hash];
      if (fromCache) {
        return fromCache;
      }
      // @ts-ignore
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
