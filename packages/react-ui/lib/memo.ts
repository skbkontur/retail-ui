const RESULT_KEY = Symbol('RESULT_KEY');

export function memo<T>(fn: T): any {
  let cache = new Map();
  const limit = 1e4;

  return (...args: any[]) => {
    try {
      let currentLevelOfCache = cache;
      args.forEach((currentArg) => {
        const temp = currentLevelOfCache.get(currentArg);
        if (!temp?.size) {
          currentLevelOfCache.set(currentArg, new Map());
        }
        currentLevelOfCache = currentLevelOfCache.get(currentArg);
      });

      const resultFromCache = currentLevelOfCache.get(RESULT_KEY);
      if (resultFromCache) {
        return resultFromCache;
      }

      // @ts-ignore
      const result = fn(...args);
      currentLevelOfCache.set(RESULT_KEY, result);
      return result;
    } finally {
      if (cache.size > limit) {
        cache = new Map();
      }
    }
  };
}
