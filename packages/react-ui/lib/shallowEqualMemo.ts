import shallowEqual from 'shallowequal';

export function shallowEqualMemo<T>(fn: T): T {
  let cache: { args: any; result: any }[] = [];
  let keysCount = 0;
  const limit = 1e4;

  // @ts-ignore
  return (...args) => {
    try {
      const fromCache = cache.find((item) => shallowEqual(item.args, args[0]));
      if (!fromCache) {
        // @ts-ignore
        const result = fn(args[0]);
        cache.push({ args: args[0], result });
        keysCount++;
        return result;
      }
      return fromCache.result;
    } finally {
      if (keysCount > limit) {
        cache = [];
        keysCount = 0;
      }
    }
  };
}
