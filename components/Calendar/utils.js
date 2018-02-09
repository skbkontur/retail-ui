// @flow

export function memo<T>(fn: T): T {
  let cache = {};
  const getHash = args => args.reduce((acc, x) => acc + x, '');
  let keysCount = 0;
  const limit = 1e4;

  // $FlowIgnore
  return function(...args) {
    try {
      const hash = getHash(args);
      const fromCache = cache[hash];
      if (fromCache) {
        return fromCache;
      }
      // $FlowIgnore
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
