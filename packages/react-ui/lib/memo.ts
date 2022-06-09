export function memo<T>(fn: T): T {
  let cache = new Map();
  let keysCount = 0;
  const limit = 1e4;

  // @ts-ignore
  return (...args) => {
    try {
      let currentLevelOfCache = cache;
      args.forEach((currentArg) => {
        const temp = currentLevelOfCache.get(currentArg);
        if (!temp?.size) {
          currentLevelOfCache.set(currentArg, new Map());
        }
        currentLevelOfCache = currentLevelOfCache.get(currentArg);
      });

      const resultFromCache = currentLevelOfCache.get('result');
      if (resultFromCache) {
        return resultFromCache;
      }

      // @ts-ignore
      const result = fn(...args);
      currentLevelOfCache.set('result', result);
      return result;
    } finally {
      if (keysCount > limit) {
        cache = new Map();
        keysCount = 0;
      }
    }
  };
}
