type MemoFunction<Args extends unknown[], Return> = (...args: Args) => Return;

export function memo<Args extends unknown[], Return>(fn: MemoFunction<Args, Return>) {
  let cache: Record<string, Return> = {};
  const getHash = (args: Args) => args.reduce<string>((acc, x) => acc + x, '');
  let keysCount = 0;
  const limit = 1e4;

  return (...args: Parameters<MemoFunction<Args, Return>>): Return => {
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
