export function memo<T>(fn: T): T {
  let cache = new Map();
  let keysCount = 0;
  const limit = 1e4;

  // @ts-ignore
  return (...args) => {
    try {
      let currentLevelOfCache = cache;
      for (let i = 0; i < args.length - 1; i++) {
        if (!currentLevelOfCache.get(args[i])) {
          const newLevelOfCache = new Map();
          newLevelOfCache.set(args[i + 1], undefined);
          currentLevelOfCache.set(args[i], newLevelOfCache);
          keysCount++;
        }
        currentLevelOfCache = currentLevelOfCache.get(args[i]);
      }
      const resultFromCache = currentLevelOfCache.get(args[args.length - 1]);

      if (resultFromCache) {
        return resultFromCache;
      }

      // @ts-ignore
      const result = fn(...args);
      currentLevelOfCache.set(args[args.length - 1], result);
      keysCount++;
      return result;
    } finally {
      if (keysCount > limit) {
        cache = new Map();
        keysCount = 0;
      }
    }
  };
}
